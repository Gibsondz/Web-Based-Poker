"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const Card_1 = require("./Card");
class Deck {
    constructor() {
        this.resetDeck();
    }
    drawCard() {
        return this.cards.pop();
    }
    resetDeck() {
        this.cards = Array();
        this.populateDeck();
        this.shuffleDeck();
    }
    shuffleDeck() {
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
    populateDeck() {
        this.cards.push(new Card_1.Card(14 /* Ace */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(14 /* Ace */, 2 /* Club */));
        this.cards.push(new Card_1.Card(14 /* Ace */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(14 /* Ace */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(13 /* King */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(13 /* King */, 2 /* Club */));
        this.cards.push(new Card_1.Card(13 /* King */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(13 /* King */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(12 /* Queen */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(12 /* Queen */, 2 /* Club */));
        this.cards.push(new Card_1.Card(12 /* Queen */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(12 /* Queen */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(11 /* Jack */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(11 /* Jack */, 2 /* Club */));
        this.cards.push(new Card_1.Card(11 /* Jack */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(11 /* Jack */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(10 /* Ten */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(10 /* Ten */, 2 /* Club */));
        this.cards.push(new Card_1.Card(10 /* Ten */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(10 /* Ten */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(9 /* Nine */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(9 /* Nine */, 2 /* Club */));
        this.cards.push(new Card_1.Card(9 /* Nine */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(9 /* Nine */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(8 /* Eight */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(8 /* Eight */, 2 /* Club */));
        this.cards.push(new Card_1.Card(8 /* Eight */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(8 /* Eight */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(7 /* Seven */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(7 /* Seven */, 2 /* Club */));
        this.cards.push(new Card_1.Card(7 /* Seven */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(7 /* Seven */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(6 /* Six */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(6 /* Six */, 2 /* Club */));
        this.cards.push(new Card_1.Card(6 /* Six */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(6 /* Six */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(5 /* Five */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(5 /* Five */, 2 /* Club */));
        this.cards.push(new Card_1.Card(5 /* Five */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(5 /* Five */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(4 /* Four */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(4 /* Four */, 2 /* Club */));
        this.cards.push(new Card_1.Card(4 /* Four */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(4 /* Four */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(3 /* Three */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(3 /* Three */, 2 /* Club */));
        this.cards.push(new Card_1.Card(3 /* Three */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(3 /* Three */, 8 /* Diamond */));
        this.cards.push(new Card_1.Card(2 /* Two */, 1 /* Spade */));
        this.cards.push(new Card_1.Card(2 /* Two */, 2 /* Club */));
        this.cards.push(new Card_1.Card(2 /* Two */, 4 /* Heart */));
        this.cards.push(new Card_1.Card(2 /* Two */, 8 /* Diamond */));
    }
}
exports.Deck = Deck;
