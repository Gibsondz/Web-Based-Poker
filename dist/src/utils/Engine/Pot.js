"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pot = void 0;
class Pot {
    constructor(players) {
        this.players = players;
        this.size = 0;
    }
    add(amount) {
        this.size += amount;
    }
    getSize() {
        return this.size;
    }
    getPlayers() {
        return this.players;
    }
}
exports.Pot = Pot;
