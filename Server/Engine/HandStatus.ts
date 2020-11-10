import { Card } from './Card';

export class HandStatus
{
    private stackSize: number;
    private folded: boolean;
    private checked: boolean;
    private allIn: boolean;
    private betChips: number;
    private holeCards: Array<Card>;

    constructor(stackSize: number)
    {
        this.stackSize = stackSize;
        this.folded = false;
        this.checked = false;
        this.allIn = false;
        this.betChips = 0;
        this.holeCards = new Array<Card>();
    }

    public bet(betSize: number)
    {
        if(this.stackSize - betSize < 0 )
        {
            this.betChips += this.stackSize;
            this.stackSize = 0;
            this.allIn = true;
        }
        else
        {
            this.betChips += betSize;
            this.stackSize -= betSize;
        }
    }

    public fold()
    {
        this.folded = true;
    }

    public getBetChips(): number
    {
        return this.betChips;
    }

    public match(amount: number)
    {
        let difference = amount - this.betChips;
        this.bet(difference);
    }

    public getStackSize(): number
    {
        return this.stackSize;
    }

    public addToStackSize(chips: number)
    {
        this.stackSize += chips;
    }

    public isFolded(): boolean
    {
        return this.folded;
    }

    public isAllIn(): boolean
    {
        return this.allIn;
    }

    public isChecked(): boolean
    {
        return this.checked;
    }

    public check()
    {
        this.checked = true;
    }

    public setHoleCards(card1: Card, card2: Card)
    {
        this.holeCards.push(card1);
        this.holeCards.push(card2);
    }

    public getHoleCards(): Array<Card>
    {
        return this.holeCards;
    }

    public handStageReset()
    {
        this.checked = false;
        this.betChips = 0;
    }

    public removeFromBet(amount : number)
    {
        this.betChips -= amount;
    }
}