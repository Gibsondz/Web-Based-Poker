import { CardValue } from './CardValue';
import { Suit } from './Suit';
export class Card{
    private value: CardValue;
    private suit: Suit;

    constructor(value: CardValue, suit: Suit)
    {
        this.value = value;
        this.suit = suit;
    }

    public getValue(): CardValue
    {
        return this.value;
    }

    public getSuit(): Suit
    {
        return this.suit;
    }
}