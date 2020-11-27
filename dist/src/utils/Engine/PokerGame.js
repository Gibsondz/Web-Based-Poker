"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerGame = void 0;
const Hand_1 = require("./Hand");
const Blind_1 = require("./Blind");
const GameRender_1 = require("./GameRender");
class PokerGame {
    constructor(Host, stackSize, blindTimer, name, password) {
        this.totalPlayers = 0;
        this.name = name;
        this.password = password;
        this.host = Host;
        this.id = '_' + Math.random().toString(36).substr(2, 9);
        this.stackMap = new Map();
        this.stackSize = stackSize;
        this.started = false;
        this.blindTimer = blindTimer;
        this.populateBlindLevels();
        this.currentBlindLevel = 1;
        this.bigBlindPointer = 0;
        this.finished = false;
    }
    addPlayer(player) {
        if (this.stackMap.size < 9) {
            if (this.started == false) {
                this.stackMap.set(player, this.stackSize);
                this.totalPlayers++;
            }
            else {
                console.log("Can't add player once game has started.");
            }
        }
        else {
            console.log("Can't add player. You would have over 9 players");
        }
    }
    removePlayer(player) {
        if (this.started == false) {
            if (this.stackMap.delete(player)) {
                console.log("Successfully removed player from game: " + player);
                this.totalPlayers--;
            }
            else {
                console.log("Error removing a player from the game: " + player);
            }
        }
        else {
            console.log("Can't remove a player once game has started.");
        }
    }
    start() {
        if (this.stackMap.size < 2 || this.stackMap.size > 9) {
            console.log("Unable to start poker game with this amount of players. Must have between 2-9.");
        }
        else {
            console.log("Starting poker game with the following settings: ");
            console.log("Starting Stack: " + this.stackSize);
            console.log("Blind Timer: " + this.blindTimer);
            console.log("Blind Levels:");
            for (let [level, blind] of this.blindLevels) {
                console.log("Level: " + level + " Blinds: " + blind.getBigBlind() + "/" + blind.getSmallBlind());
            }
            console.log("Players: ");
            for (let [player, stackSize] of this.stackMap) {
                console.log("Player: " + player.getName() + " StackSize: " + stackSize);
            }
        }
        this.started = true;
        this.currentHand = new Hand_1.Hand(this.stackMap, this.blindLevels.get(this.currentBlindLevel), this.bigBlindPointer);
    }
    call(player) {
        if (this.started == false) {
            console.log("Unable to process call action when the game has not been started");
            return;
        }
        this.currentHand.call(player);
        if (this.currentHand.isComplete()) {
            this.createNewHand();
        }
    }
    check(player) {
        if (this.started == false) {
            console.log("Unable to process call action when the game has not been started");
            return;
        }
        this.currentHand.check(player);
        if (this.currentHand.isComplete()) {
            this.createNewHand();
        }
    }
    fold(player) {
        if (this.started == false) {
            console.log("Unable to process fold action when the game has not been started");
            return;
        }
        this.currentHand.fold(player);
        if (this.currentHand.isComplete()) {
            this.createNewHand();
        }
    }
    bet(player, amount) {
        if (this.started == false) {
            console.log("Unable to process bet action when the game has not been started");
            return;
        }
        this.currentHand.bet(player, amount);
        if (this.currentHand.isComplete()) {
            this.createNewHand();
        }
    }
    createNewHand() {
        this.updateStackMap();
        if (this.isGameFinished()) {
            this.finished = true;
        }
        else {
            this.moveBigBlind();
            this.currentHand = new Hand_1.Hand(this.stackMap, this.blindLevels.get(this.currentBlindLevel), this.bigBlindPointer);
        }
    }
    moveBigBlind() {
        let newPointer = this.bigBlindPointer - 1;
        if (newPointer < 0) {
            newPointer = this.stackMap.size - 1;
        }
        while (Array.from(this.stackMap.values())[newPointer] == 0) {
            newPointer--;
        }
        this.bigBlindPointer = newPointer;
    }
    updateStackMap() {
        let statusMap = this.currentHand.getHandStatusMap();
        for (let [player, stackSize] of this.stackMap) {
            let newStackSize = statusMap.get(player).getStackSize();
            this.stackMap.set(player, newStackSize);
        }
    }
    populateBlindLevels() {
        this.blindLevels = new Map();
        this.blindLevels.set(1, new Blind_1.Blind(30, 15));
        this.blindLevels.set(2, new Blind_1.Blind(50, 25));
        this.blindLevels.set(3, new Blind_1.Blind(80, 40));
        this.blindLevels.set(4, new Blind_1.Blind(100, 50));
        this.blindLevels.set(5, new Blind_1.Blind(150, 75));
        this.blindLevels.set(6, new Blind_1.Blind(200, 100));
        this.blindLevels.set(7, new Blind_1.Blind(300, 150));
        this.blindLevels.set(8, new Blind_1.Blind(400, 200));
        this.blindLevels.set(9, new Blind_1.Blind(600, 300));
        this.blindLevels.set(10, new Blind_1.Blind(800, 400));
    }
    getGameRender() {
        return new GameRender_1.GameRender(this.currentHand.getPotSize(), this.currentHand.getCircularHandStatusMap(), this.currentHand.getPots());
        ;
    }
    isFinished() {
        return this.finished;
    }
    isGameFinished() {
        let counter = 0;
        for (let [player, stackSize] of this.stackMap) {
            if (stackSize === 0) {
                counter++;
            }
        }
        if (counter >= this.stackMap.size - 1) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.PokerGame = PokerGame;
