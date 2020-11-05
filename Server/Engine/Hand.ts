import { Player } from './Player';
import { Blind } from './Blind';
import { CircularHandStatusMap } from './CircularHandStatusMap';
import { Deck } from './Deck';
import { Card } from './Card';
import { HandStatus } from './HandStatus';

export class Hand{

    private circularHandStatusMap: CircularHandStatusMap;
    private pot: number;
    private handStage: number; //0 -> Preflop 1 -> flop 2 -> turn 3 -> river 4 -> done
    private deck: Deck;
    private board: Array<Card>;
    private smallBlindPosition: number;

    readonly PREFLOP_STAGE= 0;
    readonly FLOP_STAGE = 1;
    readonly TURN_STAGE= 2;
    readonly RIVER_STAGE = 3;
    readonly DONE_STAGE= 4;
    

    constructor(stackMap: Map<Player, number>, blinds: Blind, bigBlindPosition: number)
    {
        this.deck = new Deck();
        bigBlindPosition = this.cleanStackMap(stackMap, bigBlindPosition);
        if(bigBlindPosition == -1)
        {
            console.log("Unable to correctly set the bigBlindPosition for the hand. Hand initialization failed");
            return;
        }

        let positionNumber = 0;
        let smallBlindPosition = bigBlindPosition + 1;
        let handStatusMap = new Map<Player, HandStatus>();
        let initialActionPointer = 0;
        
        if(smallBlindPosition >= stackMap.size)
        {
            smallBlindPosition = 0;
        }
        for( let [player, stackSize] of stackMap )
        {
            handStatusMap.set(player, new HandStatus(stackSize));
            if(positionNumber == bigBlindPosition)
            {
                handStatusMap.get(player).bet(blinds.getBigBlind());
            }
            else if(positionNumber == smallBlindPosition)
            {
                handStatusMap.get(player).bet(blinds.getSmallBlind());
            }
            positionNumber++;
        }
        if(bigBlindPosition - 1 < 0)
        {
            initialActionPointer = handStatusMap.size - 1;
        }
        else
        {
            initialActionPointer = bigBlindPosition - 1;
        }

        this.smallBlindPosition = smallBlindPosition;
        this.pot = 0;
        this.board = new Array<Card>();
        this.circularHandStatusMap = new CircularHandStatusMap(handStatusMap, initialActionPointer);
        this.dealCards();
        this.handStage = this.PREFLOP_STAGE;
    }

    private dealCards()
    {   
        //After the dealing cards loop the action pointer will be at the same point as it was at initialization.
        for(let i = 0; i < this.circularHandStatusMap.size; i++)
        {
            this.circularHandStatusMap.dealToActivePlayer(this.deck);
            this.circularHandStatusMap.next();
        }
    }

    //Clean out 0 stacks from stackmap and change big blind pointer to account for the changed map.
    //Returns the new big blind position given the cleaned stack map.
    private cleanStackMap(stackMap: Map<Player, number>, bigBlindPosition: number): number
    {
        let position = 0;
        let BbPlayer;
        for( let [player, stackSize] of stackMap )
        {
            if(position == bigBlindPosition)
            {
                BbPlayer = player;
            }
            if(stackSize == 0)
            {
                stackMap.delete(player);
            }
            position++;
        }

        //Loop through cleaned stackmap to position the big blind pointer correctly.
        //This function assumes the supplied stackmap already had the bigBlindPosition correctly placed
        //To a non 0 stack player beforehand.
        position = 0;
        for( let [player, stackSize] of stackMap )
        {
            if(player.equals(BbPlayer))
            {
                return position;
            }
            position++;
        }
        return -1;
    }

    //The stage of the hand is over if
    // (1) All but one person has folded
    // (2) The current highest bet made by a players has been met by each non-folded player
    // (3) All non-folded players have checked.
    private checkNextHandStage()
    {
        if(this.everyoneFolded())
        {
            //Hand stage completed from folding.
            this.nextHandStage(true);
            return;
        }
        else if(this.everyoneChecked())
        {
            this.nextHandStage(false);
        }
        else if(this.highestBetMatched() && this.allButOneAllIn())
        {
            //TODO
        }
        else if(this.highestBetMatched())
        {
            this.nextHandStage(false);
        }
    }

    private everyoneFolded(): boolean
    {
        let counter = 0;
        for( let [player, handStatus] of this.getHandStatusMap() )
        {
            if(handStatus.isFolded())
            {
                counter++;
            }
        }
        if(counter == this.getHandStatusMap().size - 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private allButOneAllIn(): boolean
    {
        let counter = 0;
        for( let [player, handStatus] of this.getHandStatusMap() )
        {
            if(handStatus.isAllIn() || handStatus.isFolded())
            {
                counter++;
            }
        }
        if(counter == this.getHandStatusMap().size - 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private everyoneChecked(): boolean
    {
        let counter = 0;
        for( let [player, handStatus] of this.getHandStatusMap() )
        {
            if(handStatus.isChecked() || handStatus.isFolded())
            {
                counter++;
            }
        }
        if(counter == this.getHandStatusMap().size)
        {
            return true;
        }
        return false;
    }

    private highestBetMatched(): boolean
    {
        let highestBet = this.circularHandStatusMap.getHighestBet();

        let counter = 0;
        for( let [player, handStatus] of this.getHandStatusMap() )
        {
            if((handStatus.getBetChips() < highestBet) && !handStatus.isFolded() || highestBet == 0)
            {
               return false;
            }
            else
            {
                counter++;
            }
        }
        if(counter == this.getHandStatusMap().size)
        {
            return true;
        }
        return false;
    }

    //Must add all bets to the pot. Check to see if the hand is complete and a winner should be calculated/declared.
    //If a winner should not be declared move hand to the next stage.
    private nextHandStage(fromFolding: boolean)
    {
        for( let [player, handStatus] of this.getHandStatusMap() )
        {
            this.pot += handStatus.getBetChips();
        }

        if(fromFolding)
        {
            this.declareWinner(fromFolding);
            this.handStage = this.DONE_STAGE;
            return;
        }
   
        this.circularHandStatusMap.prepStatusForNextStage();

        this.handStage++;
        if(this.handStage == this.FLOP_STAGE)
        {
            for(let i = 0; i < 3; i++)
            {
                this.board.push(this.deck.drawCard());
            }
            this.circularHandStatusMap.setActivePlayer(this.smallBlindPosition);
        }
        else if(this.handStage == this.TURN_STAGE || this.handStage == this.RIVER_STAGE)
        {
            this.board.push(this.deck.drawCard());
            this.circularHandStatusMap.setActivePlayer(this.smallBlindPosition);
        }
        else if(this.handStage == this.DONE_STAGE)
        {
            this.declareWinner(fromFolding);
        }
        
    }

    private declareWinner(fromFolding: boolean)
    {
        if(fromFolding)
        {
            console.log("Winner of had has been declared from folding");
            for( let [player, handStatus] of this.getHandStatusMap() )
            {
                if(!handStatus.isFolded())
                {
                    handStatus.addToStackSize(this.pot);
                }
            }
        }
        //TODO add non-folding cases
    }

    public getActivePlayer(): Player
    {
        return this.circularHandStatusMap.getActivePlayer();
    }

    public getHandStatusMap(): Map<Player, HandStatus>
    {
        return this.circularHandStatusMap.getHandStatusMap();
    }

    public getCircularHandStatusMap() : CircularHandStatusMap
    {
        return this.circularHandStatusMap;
    }

    public isComplete(): boolean
    {
        if(this.handStage == this.DONE_STAGE)
        {
            return true;
        }
        return false;
    }

    public fold(player: Player)
    {
        if(this.circularHandStatusMap.getActivePlayer().equals(player))
        {
            this.circularHandStatusMap.fold();
            this.circularHandStatusMap.next();
            this.checkNextHandStage();
        }
        else
        {
            console.log("Fold called for a player that is not currently active: " + player.getName());
        }
    }

    public check(player: Player)
    {
        if(this.circularHandStatusMap.getActivePlayer().equals(player))
        {
            this.circularHandStatusMap.check();
            this.circularHandStatusMap.next();
            this.checkNextHandStage();
        }
        else
        {
            console.log("Fold called for a player that is not currently active: " + player.getName());
        }
    }

    public bet(player: Player, amount: number)
    {
        if(this.circularHandStatusMap.getActivePlayer().equals(player))
        {
            if(this.circularHandStatusMap.getHighestBet() == 0)
            {
                this.circularHandStatusMap.bet(amount);
                this.circularHandStatusMap.next();
                this.checkNextHandStage(); 
            }
            else if(this.circularHandStatusMap.getHighestBet() < amount)
            {
                //If the bet is higher than the last it is considered a raise.
                this.circularHandStatusMap.match(amount);
                this.circularHandStatusMap.next();
                this.checkNextHandStage(); 
            }
            else
            {
                console.log("Not a valid bet/raise amount: " + amount);
            }
        }
        else
        {
            console.log("Bet called for a player that is not currently active: " + player.getName());
        }
    }

    public call(player: Player)
    {
        if(this.circularHandStatusMap.getActivePlayer().equals(player))
        {
            this.circularHandStatusMap.call();
            this.circularHandStatusMap.next();
            this.checkNextHandStage();
        }
        else
        {
            console.log("Call called for a player that is not currently active: " + player.getName());
        }
    }

    public getPotSize() : number
    {
        return this.pot;
    }
}