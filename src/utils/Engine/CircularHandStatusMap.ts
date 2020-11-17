import { Player } from './Player';
import { HandStatus } from './HandStatus';
import { Deck } from './Deck';

export class CircularHandStatusMap
{
    private handStatusMap: Map<Player, HandStatus>;
    private actionPointer: number;

    public size;

    constructor(handStatusMap: Map<Player, HandStatus>, initialActionPointer: number)
    {
        this.handStatusMap = handStatusMap;
        this.actionPointer = initialActionPointer;
        this.size = handStatusMap.size;
    }

    public next()
    {
        if(!this.allAreAllIn())   // Dont loop through in this case as we could have a never ending loop if everyone is either folder or all in.
        {                         //Hand should end shortly after in this case.
            do {
                if( this.actionPointer - 1 < 0)
                {
                    this.actionPointer = this.handStatusMap.size - 1;
                }
                else
                {
                    this.actionPointer -= 1;
                }
            }
            while(Array.from(this.handStatusMap.values())[this.actionPointer].isFolded() || Array.from(this.handStatusMap.values())[this.actionPointer].isAllIn())
        }
    }

    public getActivePlayer(): Player
    {
        return Array.from(this.handStatusMap.keys())[this.actionPointer];
    }

    public setActivePlayer(index: number)
    {
        this.actionPointer = index;
        if(Array.from(this.handStatusMap.values())[this.actionPointer].isFolded() || Array.from(this.handStatusMap.values())[this.actionPointer].isAllIn())
        {
            this.next();
        }
    }

    public getActivePlayerStatus(): HandStatus
    {
        let iteration = 0;
        for( let [player, handStatus] of this.handStatusMap )
        {
            if(iteration == this.actionPointer)
            {
                return handStatus;
            }
            iteration++;
        }
    }

    public getHandStatusMap(): Map<Player, HandStatus>
    {
        return this.handStatusMap;
    }

    public dealToActivePlayer(deck: Deck)
    {
        let activePlayerHandStatus = Array.from(this.handStatusMap.values())[this.actionPointer];
        activePlayerHandStatus.setHoleCards(deck.drawCard(), deck.drawCard());
    }

    public getHighestBet()
    {
        let highestBet = 0;
        for( let [player, handStatus] of this.getHandStatusMap() )
        {
            if(handStatus.getBetChips() > highestBet)
            {
               highestBet = handStatus.getBetChips();
            }
        }
        return highestBet;
    }

    private allAreAllIn() : Boolean
    {
        let counter = 0;
        for( let [player, handStatus] of this.handStatusMap )
        {
            if(handStatus.isFolded() || handStatus.isAllIn())
            {
                counter++;
            }
        }
        if(counter == this.getHandStatusMap().size )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public prepStatusForNextStage()
    {
        for( let [player, handStatus] of this.handStatusMap )
        {
            handStatus.handStageReset();
        }
    }

    public fold()
    {
        this.getActivePlayerStatus().fold();
    }

    public call()
    {
        this.getActivePlayerStatus().match(this.getHighestBet());
    }

    public match(amount: number)
    {
        this.getActivePlayerStatus().match(amount);
    }

    public bet(amount: number)
    {
        this.getActivePlayerStatus().bet(amount);
    }

    public check()
    {
        this.getActivePlayerStatus().check();
    }
}