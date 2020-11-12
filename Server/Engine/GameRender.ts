import { CircularHandStatusMap } from "./CircularHandStatusMap";
import { HandStatus } from "./HandStatus";
import { Player } from "./Player";
import { Pot } from "./Pot";

export class GameRender
{
    private potsize: number;
    private circularHandStatusMap: CircularHandStatusMap
    private activePlayer: Player
    private pots : Array<Pot>;

    constructor( pot : number, map : CircularHandStatusMap, pots : Array<Pot>)
    {
        this.potsize = pot;
        this.circularHandStatusMap = map;
        this.activePlayer = this.circularHandStatusMap.getActivePlayer();
        this.pots = pots;
    }

    public getPotsize()
    {
        return this.potsize;
    }

    public getHandStatusMap(): Map<Player, HandStatus>
    {
        return this.circularHandStatusMap.getHandStatusMap();
    }

    public getActivePlayer(): Player
    {
        return this.activePlayer;
    }

    public getPots()
    {
        return this.pots;
    }
}