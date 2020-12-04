import { Player } from './Player';
import { Hand } from './Hand';
import { Blind } from './Blind';
import { GameRender } from './GameRender';

export class PokerGame
{
    public id: String;
    public host: String;
    public name: String;
    public password: String;
    public totalPlayers: number;
    public stackMap: Map<Player, number>;
    public blindTimer: number;
    private currentBlindTimer: number;
    private blindLevels: Map<number, Blind>;
    private currentHand: Hand;
    public started: boolean;
    private stackSize: number;
    private currentBlindLevel: number;
    private bigBlindPointer: number;
    private finished: boolean;
    private showdownRender : GameRender;
    private showShowdown : boolean;

    constructor(Host: string, stackSize: number, blindTimer: number, name: string, password)
    {
        this.totalPlayers = 0
        this.name = name;
        this.password = password;
        this.host = Host;
        this.id = '_' + Math.random().toString(36).substr(2, 9);
        this.stackMap = new Map<Player, number>();
        this.stackSize = stackSize;
        this.started = false;
        this.blindTimer = blindTimer;
        this.currentBlindTimer = blindTimer;
        this.populateBlindLevels();
        this.currentBlindLevel = 1;
        this.bigBlindPointer = 0;
        this.finished = false;
        this.showShowdown = false;
    }

    public addPlayer(player: Player)
    {
        if(this.stackMap.size < 9)
        {
            if(this.started == false)
            {
                this.stackMap.set(player, this.stackSize); 
                this.totalPlayers++;
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
                this.totalPlayers--;
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
        
        let blindInterval = setInterval(() => {
            this.currentBlindTimer--;
            if(this.currentBlindTimer <= 0) //Time to increase the blinds
            {
                this.currentBlindLevel++;
                this.currentBlindTimer = this.blindTimer;
                if(this.currentBlindLevel >= 10)
                {
                    this.currentBlindLevel = 10;
                    clearInterval(blindInterval);
                }
            }
        }, 60000);
    }

    public call(player: Player)
    {
        if(this.started == false)
        {
            console.log("Unable to process call action when the game has not been started");
            return;
        }
        this.currentHand.call(player);
        this.checkHandCompletion();
    }

    public check(player: Player)
    {
        if(this.started == false)
        {
            console.log("Unable to process call action when the game has not been started");
            return;
        }
        this.currentHand.check(player);
        this.checkHandCompletion();
    }

    public fold(player: Player) 
    {
        if(this.started == false)
        {
            console.log("Unable to process fold action when the game has not been started");
            return;
        }
        this.currentHand.fold(player);
        this.checkHandCompletion();
    }

    public bet(player: Player, amount: number)
    {
        if(this.started == false)
        {
            console.log("Unable to process bet action when the game has not been started");
            return;
        }
        this.currentHand.bet(player, amount);
        this.checkHandCompletion();
    }

    private createNewHand()
    {
        this.updateStackMap();
        if(this.isGameFinished())
        {
            this.finished = true;
        }
        else
        {
            this.moveBigBlind();
            this.currentHand = new Hand(this.stackMap, this.blindLevels.get(this.currentBlindLevel), this.bigBlindPointer);
        }
    }

    private checkHandCompletion()
    {   
        if(this.currentHand.isComplete())
        {
            this.createShowDownRender();
            this.createNewHand();
        }
    }

    private createShowDownRender()
    {
        this.showdownRender = new GameRender(this.currentHand.getPotSize(), this.currentHand.getCircularHandStatusMap(), 
            this.blindLevels.get(this.currentBlindLevel), this.currentBlindTimer, this.currentHand.getBoard(), this.currentHand.getHandBigBlindSize());
            
        this.showShowdown = true; 
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
        return new GameRender(this.currentHand.getPotSize(), this.currentHand.getCircularHandStatusMap(), 
            this.blindLevels.get(this.currentBlindLevel), this.currentBlindTimer, this.currentHand.getBoard(), this.currentHand.getHandBigBlindSize());
    }

    public isFinished() : boolean
    {
        return this.finished;
    }

    public getShowdownRender() : GameRender
    {
        return this.showdownRender;
    }

    public useShowdownRender()
    {
        return this.showShowdown;
    }

    public setUseShowdownRender(shouldUse: boolean)
    {
        this.showShowdown = shouldUse;
    }

    private isGameFinished() : boolean
    {
        let counter = 0;
        for( let [player, stackSize] of this.stackMap )
        {
            if(stackSize === 0)
            {
                counter++;
            }
        }
        if(counter >= this.stackMap.size - 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}






