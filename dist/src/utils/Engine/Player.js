"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    equals(player1) {
        if (this.name == player1.getName()) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Player = Player;
