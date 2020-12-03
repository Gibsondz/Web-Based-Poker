import { CircularHandStatusMap } from "./CircularHandStatusMap";
import { HandStatus } from "./HandStatus";
import { Player } from "./Player";
import { Blind } from "./Blind";
import { Card } from "./Card";

export class GameRender
{
    private potsize: number;
    private circularHandStatusMap: CircularHandStatusMap
    private activePlayer: Player
    private blinds: Blind
    private blindTimer: number;
    private board: Array<Card>;
    private currentHandBigBlind: number;

    constructor( pot : number, map : CircularHandStatusMap, blinds: Blind, blindTimer: number, board : Array<Card>, currentHandBigBlind : number)
    {
        this.potsize = pot;
        this.circularHandStatusMap = map;
        this.activePlayer = this.circularHandStatusMap.getActivePlayer();
        this.blinds = blinds;
        this.blindTimer = blindTimer;
        this.board = board;
        this.currentHandBigBlind = currentHandBigBlind;
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

    public getBlinds(): Blind
    {
        return this.blinds;
    }

    public getBlindTimer(): number
    {
        return this.blindTimer;
    }

    public getBoard(): Array<Card>
    {
        return this.board;
    }

    public isBetOut(): boolean
    {
        return this.circularHandStatusMap.getHighestBet() != 0;
    }

    public getCurrentHandBigBlind(): number 
    {
        return this.currentHandBigBlind;
    }
}