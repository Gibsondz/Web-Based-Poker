class Deck{
    private cards: Array<Card>;

    constructor()
    {
        this.resetDeck();
    }

    public drawCard() : Card
    {
        return this.cards.pop();
    }

    public resetDeck()
    {
        this.cards = Array<Card>();
        this.populateDeck();
        this.shuffleDeck();
    }

    private shuffleDeck()
    {
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    private populateDeck()
    {
        
        this.cards.push( new Card(CardValue.Ace, Suit.Spade) );
        this.cards.push( new Card(CardValue.Ace, Suit.Club) );
        this.cards.push( new Card(CardValue.Ace, Suit.Heart) );
        this.cards.push( new Card(CardValue.Ace, Suit.Diamond) );

        this.cards.push( new Card(CardValue.King, Suit.Spade) );
        this.cards.push( new Card(CardValue.King, Suit.Club) );
        this.cards.push( new Card(CardValue.King, Suit.Heart) );
        this.cards.push( new Card(CardValue.King, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Queen, Suit.Spade) );
        this.cards.push( new Card(CardValue.Queen, Suit.Club) );
        this.cards.push( new Card(CardValue.Queen, Suit.Heart) );
        this.cards.push( new Card(CardValue.Queen, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Jack, Suit.Spade) );
        this.cards.push( new Card(CardValue.Jack, Suit.Club) );
        this.cards.push( new Card(CardValue.Jack, Suit.Heart) );
        this.cards.push( new Card(CardValue.Jack, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Ten, Suit.Spade) );
        this.cards.push( new Card(CardValue.Ten, Suit.Club) );
        this.cards.push( new Card(CardValue.Ten, Suit.Heart) );
        this.cards.push( new Card(CardValue.Ten, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Nine, Suit.Spade) );
        this.cards.push( new Card(CardValue.Nine, Suit.Club) );
        this.cards.push( new Card(CardValue.Nine, Suit.Heart) );
        this.cards.push( new Card(CardValue.Nine, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Eight, Suit.Spade) );
        this.cards.push( new Card(CardValue.Eight, Suit.Club) );
        this.cards.push( new Card(CardValue.Eight, Suit.Heart) );
        this.cards.push( new Card(CardValue.Eight, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Seven, Suit.Spade) );
        this.cards.push( new Card(CardValue.Seven, Suit.Club) );
        this.cards.push( new Card(CardValue.Seven, Suit.Heart) );
        this.cards.push( new Card(CardValue.Seven, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Six, Suit.Spade) );
        this.cards.push( new Card(CardValue.Six, Suit.Club) );
        this.cards.push( new Card(CardValue.Six, Suit.Heart) );
        this.cards.push( new Card(CardValue.Six, Suit.Diamond) );
        
        this.cards.push( new Card(CardValue.Five, Suit.Spade) );
        this.cards.push( new Card(CardValue.Five, Suit.Club) );
        this.cards.push( new Card(CardValue.Five, Suit.Heart) );
        this.cards.push( new Card(CardValue.Five, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Four, Suit.Spade) );
        this.cards.push( new Card(CardValue.Four, Suit.Club) );
        this.cards.push( new Card(CardValue.Four, Suit.Heart) );
        this.cards.push( new Card(CardValue.Four, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Three, Suit.Spade) );
        this.cards.push( new Card(CardValue.Three, Suit.Club) );
        this.cards.push( new Card(CardValue.Three, Suit.Heart) );
        this.cards.push( new Card(CardValue.Three, Suit.Diamond) );

        this.cards.push( new Card(CardValue.Two, Suit.Spade) );
        this.cards.push( new Card(CardValue.Two, Suit.Club) );
        this.cards.push( new Card(CardValue.Two, Suit.Heart) );
        this.cards.push( new Card(CardValue.Two, Suit.Diamond) );
    }
}