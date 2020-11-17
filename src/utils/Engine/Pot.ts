import { Player } from './Player';

export class Pot{

    private size: number;
    private players: Array<Player>;

    constructor(players: Array<Player>)
    {
        this.players = players;
        this.size = 0;
    }

    public add(amount : number)
    {
        this.size += amount;
    }

    public getSize() : number
    {
        return this.size;
    }

    public getPlayers() : Array<Player>
    {
        return this.players;
    }
}
