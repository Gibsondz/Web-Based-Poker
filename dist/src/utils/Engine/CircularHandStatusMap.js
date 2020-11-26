"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularHandStatusMap = void 0;
class CircularHandStatusMap {
    constructor(handStatusMap, initialActionPointer) {
        this.handStatusMap = handStatusMap;
        this.actionPointer = initialActionPointer;
        this.size = handStatusMap.size;
    }
    next() {
        if (!this.allAreAllIn()) // Dont loop through in this case as we could have a never ending loop if everyone is either folder or all in.
         { //Hand should end shortly after in this case.
            do {
                if (this.actionPointer - 1 < 0) {
                    this.actionPointer = this.handStatusMap.size - 1;
                }
                else {
                    this.actionPointer -= 1;
                }
            } while (Array.from(this.handStatusMap.values())[this.actionPointer].isFolded() || Array.from(this.handStatusMap.values())[this.actionPointer].isAllIn());
        }
    }
    getActivePlayer() {
        return Array.from(this.handStatusMap.keys())[this.actionPointer];
    }
    setActivePlayer(index) {
        this.actionPointer = index;
        if (Array.from(this.handStatusMap.values())[this.actionPointer].isFolded() || Array.from(this.handStatusMap.values())[this.actionPointer].isAllIn()) {
            this.next();
        }
    }
    getActivePlayerStatus() {
        let iteration = 0;
        for (let [player, handStatus] of this.handStatusMap) {
            if (iteration == this.actionPointer) {
                return handStatus;
            }
            iteration++;
        }
    }
    getHandStatusMap() {
        return this.handStatusMap;
    }
    dealToActivePlayer(deck) {
        let activePlayerHandStatus = Array.from(this.handStatusMap.values())[this.actionPointer];
        activePlayerHandStatus.setHoleCards(deck.drawCard(), deck.drawCard());
    }
    getHighestBet() {
        let highestBet = 0;
        for (let [player, handStatus] of this.getHandStatusMap()) {
            if (handStatus.getBetChips() > highestBet) {
                highestBet = handStatus.getBetChips();
            }
        }
        return highestBet;
    }
    allAreAllIn() {
        let counter = 0;
        for (let [player, handStatus] of this.handStatusMap) {
            if (handStatus.isFolded() || handStatus.isAllIn()) {
                counter++;
            }
        }
        if (counter == this.getHandStatusMap().size) {
            return true;
        }
        else {
            return false;
        }
    }
    prepStatusForNextStage() {
        for (let [player, handStatus] of this.handStatusMap) {
            handStatus.handStageReset();
        }
    }
    fold() {
        this.getActivePlayerStatus().fold();
    }
    call() {
        this.getActivePlayerStatus().match(this.getHighestBet());
    }
    match(amount) {
        this.getActivePlayerStatus().match(amount);
    }
    bet(amount) {
        this.getActivePlayerStatus().bet(amount);
    }
    check() {
        this.getActivePlayerStatus().check();
    }
}
exports.CircularHandStatusMap = CircularHandStatusMap;
