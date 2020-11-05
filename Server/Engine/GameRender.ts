import { CircularHandStatusMap } from "./CircularHandStatusMap";
import { HandStatus } from "./HandStatus";
import { Player } from "./Player";

export class GameRender
{
    private potsize: number;
    private circularHandStatusMap: CircularHandStatusMap
    private activePlayer: Player


    constructor( pot : number, map : CircularHandStatusMap)
    {
        this.potsize = pot;
        this.circularHandStatusMap = map;
        this.activePlayer = this.circularHandStatusMap.getActivePlayer();
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
}