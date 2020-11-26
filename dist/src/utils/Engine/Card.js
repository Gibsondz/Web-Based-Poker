"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
    getValue() {
        return this.value;
    }
    getSuit() {
        return this.suit;
    }
}
exports.Card = Card;
