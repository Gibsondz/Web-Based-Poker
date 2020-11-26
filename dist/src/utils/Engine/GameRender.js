"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRender = void 0;
class GameRender {
    constructor(pot, map, pots) {
        this.potsize = pot;
        this.circularHandStatusMap = map;
        this.activePlayer = this.circularHandStatusMap.getActivePlayer();
        this.pots = pots;
    }
    getPotsize() {
        return this.potsize;
    }
    getHandStatusMap() {
        return this.circularHandStatusMap.getHandStatusMap();
    }
    getActivePlayer() {
        return this.activePlayer;
    }
    getPots() {
        return this.pots;
    }
}
exports.GameRender = GameRender;
