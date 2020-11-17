export class Blind
{
    private bigBlind: number;
    private smallBlind: number;

    constructor(bigBlind: number, smallBlind: number)
    {
        this.bigBlind = bigBlind;
        this.smallBlind = smallBlind;
    }

    public getBigBlind() : number
    {
        return this.bigBlind;
    }

    public getSmallBlind() : number
    {
        return this.smallBlind;
    }
}