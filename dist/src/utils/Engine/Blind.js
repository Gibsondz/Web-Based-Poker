"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blind = void 0;
class Blind {
    constructor(bigBlind, smallBlind) {
        this.bigBlind = bigBlind;
        this.smallBlind = smallBlind;
    }
    getBigBlind() {
        return this.bigBlind;
    }
    getSmallBlind() {
        return this.smallBlind;
    }
}
exports.Blind = Blind;
