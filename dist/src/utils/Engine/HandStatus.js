"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandStatus = void 0;
class HandStatus {
    constructor(stackSize) {
        this.stackSize = stackSize;
        this.folded = false;
        this.checked = false;
        this.allIn = false;
        this.betChips = 0;
        this.holeCards = new Array();
    }
    bet(betSize) {
        if (this.stackSize - betSize < 0) {
            this.betChips += this.stackSize;
            this.stackSize = 0;
            this.allIn = true;
        }
        else {
            this.betChips += betSize;
            this.stackSize -= betSize;
        }
    }
    fold() {
        this.folded = true;
    }
    getBetChips() {
        return this.betChips;
    }
    match(amount) {
        let difference = amount - this.betChips;
        this.bet(difference);
    }
    getStackSize() {
        return this.stackSize;
    }
    addToStackSize(chips) {
        this.stackSize += chips;
    }
    isFolded() {
        return this.folded;
    }
    isAllIn() {
        return this.allIn;
    }
    isChecked() {
        return this.checked;
    }
    check() {
        this.checked = true;
    }
    setHoleCards(card1, card2) {
        this.holeCards.push(card1);
        this.holeCards.push(card2);
    }
    getHoleCards() {
        return this.holeCards;
    }
    handStageReset() {
        this.checked = false;
        this.betChips = 0;
    }
    removeFromBet(amount) {
        this.betChips -= amount;
    }
}
exports.HandStatus = HandStatus;
