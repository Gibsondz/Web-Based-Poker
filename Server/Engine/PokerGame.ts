import { Player } from './Player';
import { Hand } from './Hand';
import { Blind } from './Blind';
import { GameRender } from './GameRender';

export class PokerGame
{
    private stackMap: Map<Player, number>;
    private blindLevels: Map<number, Blind>;
    private blindTimer: number;
    private currentHand: Hand;
    private started: boolean;
    private stackSize: number;
    private currentBlindLevel: number;
    private bigBlindPointer: number;

    constructor(stackSize: number, blindTimer: number)
    {
        this.stackMap = new Map<Player, number>();
        this.stackSize = stackSize;
        this.started = false;
        this.blindTimer = blindTimer;
        this.populateBlindLevels();
        this.currentBlindLevel = 1;
        this.bigBlindPointer = 0;
    }

    public addPlayer(player: Player)
    {
        if(this.stackMap.size < 9)
        {
            if(this.started == false)
            {
                this.stackMap.set(player, this.stackSize); 
            }
            else
            {
                console.log("Can't add player once game has started.")
            }
        }
        else
        {
            console.log("Can't add player. You would have over 9 players");
        }
    }

    public removePlayer(player: Player)
    {
        if(this.started == false)
        {
            if(this.stackMap.delete(player))
            {
                console.log("Successfully removed player from game: " + player);
            }
            else
            {
                console.log("Error removing a player from the game: " + player);
            }
        }
        else
        {
            console.log("Can't remove a player once game has started.")
        }
    }

    public start()
    {
        if(this.stackMap.size < 2 || this.stackMap.size > 9)
        {
            console.log("Unable to start poker game with this amount of players. Must have between 2-9.");
        }
        else
        {
            console.log("Starting poker game with the following settings: ");
            console.log("Starting Stack: " + this.stackSize);
            console.log("Blind Timer: " + this.blindTimer);
            console.log("Blind Levels:");
            for( let [level, blind] of this.blindLevels )
            {
                console.log("Level: " + level + " Blinds: " + blind.getBigBlind() + "/" + blind.getSmallBlind());
            }
            console.log("Players: ")
            for( let [player, stackSize] of this.stackMap )
            {
                console.log("Player: " + player.getName() + " StackSize: " + stackSize);
            }
        }
        this.started = true;
        this.currentHand = new Hand(this.stackMap, this.blindLevels.get(this.currentBlindLevel), this.bigBlindPointer);
    }

    public call(player: Player)
    {
        if(this.started == false)
        {
            console.log("Unable to process call action when the game has not been started");
            return;
        }
        this.currentHand.call(player);
        if(this.currentHand.isComplete())
        {
            this.createNewHand();
        }
    }

    public check(player: Player)
    {
        if(this.started == false)
        {
            console.log("Unable to process call action when the game has not been started");
            return;
        }
        this.currentHand.check(player);
        if(this.currentHand.isComplete())
        {
            this.createNewHand();
        }
    }

    public fold(player: Player) 
    {
        if(this.started == false)
        {
            console.log("Unable to process fold action when the game has not been started");
            return;
        }
        this.currentHand.fold(player);
        if(this.currentHand.isComplete())
        {
            this.createNewHand();
        }
    }

    public bet(player: Player, amount: number)
    {
        if(this.started == false)
        {
            console.log("Unable to process bet action when the game has not been started");
            return;
        }
        this.currentHand.bet(player, amount);
        if(this.currentHand.isComplete())
        {
            this.createNewHand();
        }
    }

    private createNewHand()
    {
        this.updateStackMap();
        this.moveBigBlind();
        this.currentHand = new Hand(this.stackMap, this.blindLevels.get(this.currentBlindLevel), this.bigBlindPointer);
    }

    private moveBigBlind()
    {
        let newPointer = this.bigBlindPointer - 1;
        if(newPointer < 0)
        {
            newPointer = this.stackMap.size - 1;
        }
        while(Array.from(this.stackMap.values())[newPointer] == 0)
        {
            newPointer--;
        }
        
        this.bigBlindPointer = newPointer;
    }

    private updateStackMap()
    {
        let statusMap = this.currentHand.getHandStatusMap();
        for( let [player, stackSize] of this.stackMap )
        {
            let newStackSize = statusMap.get(player).getStackSize();
            this.stackMap.set(player, newStackSize);
        }
    }

    private populateBlindLevels()
    {
        this.blindLevels = new Map<number, Blind>();
        this.blindLevels.set(1, new Blind(30,15));
        this.blindLevels.set(2, new Blind(50,25));
        this.blindLevels.set(3, new Blind(80,40));
        this.blindLevels.set(4, new Blind(100,50));
        this.blindLevels.set(5, new Blind(150,75));
        this.blindLevels.set(6, new Blind(200,100));
        this.blindLevels.set(7, new Blind(300,150));
        this.blindLevels.set(8, new Blind(400,200));
        this.blindLevels.set(9, new Blind(600,300));
        this.blindLevels.set(10, new Blind(800,400));
    }

    public getGameRender() : GameRender
    {
        return new GameRender(this.currentHand.getPotSize(), this.currentHand.getCircularHandStatusMap());
    }
}






