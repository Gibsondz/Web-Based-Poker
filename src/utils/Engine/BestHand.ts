import { Player } from './Player';
import { HandStatus } from './HandStatus';
import { Categories } from './Categories';

import { Card } from './Card';

export class BestHand
{
    //need to know the players, their hands and the board

    private finalBoard : Array<Card>;
    private handStatusMap : Map<Player, HandStatus>;

    /* do not change order unless you know what you are doing */
    public static CategoryList = [
        {categoryName:Categories.FK, rank:7},
        {categoryName:Categories.SF, rank:8},
        {categoryName:Categories.ST, rank:4},
        {categoryName:Categories.FL, rank:5},
        {categoryName:Categories.HC, rank:0},
        {categoryName:Categories.OP, rank:1},
        {categoryName:Categories.TP, rank:2},
        {categoryName:Categories.RF, rank:9},
        {categoryName:Categories.TK, rank:3},
        {categoryName:Categories.FH, rank:6},
    ];

    public setBoard(newBoard) {
        this.finalBoard = newBoard;
    }

    public setHandStatusMap(newMap) {
        this.handStatusMap = newMap;
    }

    constructor(handStatusMap: Map<Player, HandStatus>,board: Array<Card>) {
        if (board.length !== 5) {
            console.log("Failed to initialize Best Hand: expected full board of 5 but received:", board);
            return;
        }
        this.handStatusMap = new Map<Player, HandStatus>();
        for (let [player, handStatus] of handStatusMap) {
            if (!handStatus.isFolded()) {
                if (handStatus.getHoleCards().length !== 2) {
                    console.log("Failed to initialize Best Hand: at least one player is missing their hand", handStatus.getHoleCards());
                    return;
                }
                this.handStatusMap.set(player, handStatus);
            }
        }
        if (handStatusMap.size <= 0) {
            console.log("Failed to initialize Best Hand: all players have folded");
            return;
        }
        this.finalBoard = board;
    }
/**
 * this is a really big function right now- if have time later to optimize and cleanup then would definitely split this up. Right now it is invoked with a BestHand instance and returns an array of winning players, their best hand, and the classification object according to CategoryList above
 * @return [[Player, Array<Card>, {categoryName:a,rank:b}]]
 */
    public findWinner() {
        let bestHands = new Array();
        for (let [player, handStatus] of this.handStatusMap) {
            const totalArray = [...this.finalBoard, ...handStatus.getHoleCards()];
            const combinationArray = this.generateCombinations(totalArray, 5);
            const bestHand = this.findBestHand(combinationArray);
            bestHands.push([player, ...bestHand]);
        }
        //compare ranks of best hands, majority of cases can be resolved this way
        bestHands.sort((a, b) => {
            return b[b.length-1].rank - a[a.length-1].rank;
        });
        bestHands = bestHands.filter((hand, index) => {
            if (index === 0) return true;
            return hand[hand.length-1] === bestHands[0][hand.length-1];
        });
        if (bestHands.length === 1) {
            return bestHands;
        }
        //edge cases when rank matches for best hand, can still be outright winner OR split in this case
        //high card, straight, flush and straight-flush edge case check-who has the largest card? Straightforward since already sorted, so just compare first element in card array(bestHands[i][1][0]):
        if ([Categories.HC, Categories.ST, Categories.FL, Categories.SF].includes(bestHands[0][2].categoryName)) {
            let largestHands = [bestHands[0]];
            let maxValue = bestHands[0][1][0].getValue();
            for (let i = 1; i < bestHands.length; i++) {
                if (bestHands[i][1][0].getValue() > maxValue) {
                    maxValue = bestHands[i][1][0].getValue();
                    largestHands = [];
                    largestHands.push(bestHands[i]);
                }
                else if (bestHands[i][1][0].getValue() === maxValue) {
                    largestHands.push(bestHands[i]);
                }
            }
            return largestHands;
        }
        //do one pair and two pair - ie validate their best pair and then high card
        //for one pair identify the pair and just compare
        if (bestHands[0][2].categoryName === Categories.OP) {
            let largestHands = [bestHands[0]];
            let player_maxPair = [0,this.getSinglePairVal(bestHands[0][1])];
            for (let i = 1; i < bestHands.length; i++) {
                let pairVal = this.getSinglePairVal(bestHands[i][1]);
                if (pairVal > player_maxPair[1]) {
                    player_maxPair = [i,pairVal];
                    largestHands = [];
                    largestHands.push(bestHands[i]);
                }
                else if (pairVal === player_maxPair[1]) {
                    //need to check next highest card
                    let bestIdx = player_maxPair[0];
                    let challengingHC = bestHands[i][1][0].getValue() === pairVal ? bestHands[i][1][2] : bestHands[i][1][0];
                    let currentHC = bestHands[bestIdx][1][0].getValue() === pairVal ? bestHands[bestIdx][1][2] : bestHands[bestIdx][1][0];
                    if (challengingHC.getValue() > currentHC.getValue()) {
                        player_maxPair[0] = i;
                        largestHands = [];
                        largestHands.push(bestHands[i]);
                    }
                    else if (challengingHC.getValue() === currentHC.getValue()) {
                        //check second to last card
                        challengingHC = bestHands[i][1][3].getValue() === pairVal ? bestHands[i][1][2].getValue() === pairVal ? bestHands[i][1][1] : bestHands[i][1][2] : bestHands[i][1][3];
                        currentHC = bestHands[bestIdx][1][3].getValue() === pairVal ? bestHands[bestIdx][1][2].getValue() === pairVal ? bestHands[bestIdx][1][1] : bestHands[bestIdx][1][2] : bestHands[bestIdx][1][3];
                        if (challengingHC.getValue() > currentHC.getValue()) {
                            player_maxPair[0] = i;
                            largestHands = [];
                            largestHands.push(bestHands[i]);
                        }
                        else if (challengingHC.getValue() === currentHC.getValue()) {
                            //check final card next
                            challengingHC = bestHands[i][1][4].getValue() === pairVal ? bestHands[i][1][2] : bestHands[i][1][4];
                            currentHC = bestHands[bestIdx][1][4].getValue() === pairVal ? bestHands[bestIdx][1][2] : bestHands[bestIdx][1][4];
                            if (challengingHC.getValue() > currentHC.getValue()) {
                                player_maxPair[0] = i;
                                largestHands = [];
                                largestHands.push(bestHands[i]);
                            }
                            else if (challengingHC.getValue() === currentHC.getValue()) {
                                largestHands.push(bestHands[i]);
                            }
                        }
                    }
                }
            }
            return largestHands;
        }
        //for two pair identify the best pair and compare
        //intuition: know that in the penultimate positions on the array will contain a pair value since sorted, so the outlier 5th element is either 
        if (bestHands[0][2].categoryName === Categories.TP) {
            let largestHands = [bestHands[0]];
            let player_maxPair = [0,bestHands[0][1][1].getValue()];
            //let maxPairVal = Math.max(bestPairs[0], bestPairs[1]);
            for (let i = 1; i < bestHands.length; i++) {
                //if player has higher max pair
                if (bestHands[i][1][1].getValue() > player_maxPair[1]) {
                    player_maxPair = [i,bestHands[i][1][1].getValue()];
                    largestHands = [];
                    largestHands.push(bestHands[i]);
                } //if player matches highest pair, check lowest pair
                else if (bestHands[i][1][1].getValue() === player_maxPair[1]) {
                    let currentBestPlayerIdx = player_maxPair[0];
                    if (bestHands[i][1][3].getValue() > bestHands[currentBestPlayerIdx][1][3].getValue()) {
                        player_maxPair[0] = i;
                        largestHands = [];
                        largestHands.push(bestHands[i]);
                    }
                    else if (bestHands[i][1][3].getValue() === bestHands[currentBestPlayerIdx][1][3].getValue()) {
                        //if lowest pair is equal, check last card
                        let challengeCardVal = this.getDistinctCardVal(bestHands[i][1]);
                        let existingCardVal = this.getDistinctCardVal(bestHands[currentBestPlayerIdx][1]);
                        if (challengeCardVal > existingCardVal) {
                            player_maxPair[0] = i;
                            largestHands = [];
                            largestHands.push(bestHands[i]);
                        }
                        else if (challengeCardVal === existingCardVal) {
                            largestHands.push(bestHands[i]);
                        }
                    }
                }
            }
            return largestHands;
        }

        //3 of a kind & 4 of a kind check
        //intuition: middle card will always be part of the 3/4 of a kind since sorted
        if ([Categories.TK, Categories.FK].includes(bestHands[0][2].categoryName)) {
            let largestHands = [bestHands[0]];
            let player_maxPair = [0,bestHands[0][1][2].getValue()];
            for (let i = 1; i < bestHands.length; i++) {
                if (bestHands[i][1][2].getValue() > player_maxPair[1]) {
                    player_maxPair = [i,bestHands[i][1][2].getValue()];
                    largestHands = [];
                    largestHands.push(bestHands[i]);
                }
                else if (bestHands[i][1][2].getValue() === player_maxPair[1]) {
                    //need to check next highest card
                    let bestIdx = player_maxPair[0];
                    let challengingHC;
                    let currentHC;
                    if (bestHands[0][2].categoryName === Categories.FK) {
                        challengingHC = bestHands[i][1][0].getValue() === player_maxPair[1] ? bestHands[i][1][4] : bestHands[i][1][0];
                        currentHC = bestHands[bestIdx][1][0].getValue() === player_maxPair[1] ? bestHands[bestIdx][1][4] : bestHands[bestIdx][1][0];
                    }
                    else {
                        challengingHC = bestHands[i][1][0].getValue() === player_maxPair[1] ? bestHands[i][1][3] : bestHands[i][1][0];
                        currentHC = bestHands[bestIdx][1][0].getValue() === player_maxPair[1] ? bestHands[bestIdx][1][3] : bestHands[bestIdx][1][0];
                    }
                    if (challengingHC.getValue() > currentHC.getValue()) {
                        player_maxPair[0] = i;
                        largestHands = [];
                        largestHands.push(bestHands[i]);
                    }
                    else if (challengingHC.getValue() === currentHC.getValue()) {
                        challengingHC = bestHands[i][1][4].getValue() === player_maxPair[1] ? bestHands[i][1][1] : bestHands[i][1][4];
                        currentHC = bestHands[bestIdx][1][4].getValue() === player_maxPair[1] ? bestHands[bestIdx][1][1] : bestHands[bestIdx][1][4];
                        if (challengingHC.getValue() > currentHC.getValue()) {
                            player_maxPair[0] = i;
                            largestHands = [];
                            largestHands.push(bestHands[i]);
                        }
                        else if (challengingHC.getValue() === currentHC.getValue()) {
                            largestHands.push(bestHands[i]);
                        }
                    }
                }
            }
            return largestHands;
        }

        if (bestHands[0][2].categoryName === Categories.FH) {
            let largestHands = [bestHands[0]];
            let tripsIdx = this.getTripsIndex(bestHands[0][1]);
            let plr_maxtPairVal = [0, bestHands[0][1][tripsIdx].getValue()];
            for (let i = 1; i < bestHands.length; i++) {
                let idx = this.getTripsIndex(bestHands[i][1]);
                if (bestHands[i][1][idx].getValue() > plr_maxtPairVal[1]) {
                    plr_maxtPairVal = [i,bestHands[i][1][idx].getValue()];
                    largestHands = [];
                    largestHands.push(bestHands[i]);
                }
                else if (bestHands[i][1][idx].getValue() === plr_maxtPairVal[1]) {
                    //need to check 2 pair
                    let tPairIdx = (idx + 3) % 5;
                    let challenging2pairVal = bestHands[i][1][tPairIdx].getValue();
                    tPairIdx = this.getTripsIndex(bestHands[plr_maxtPairVal[0]][1]);
                    tPairIdx = (tPairIdx + 3) % 5;
                    let current2pairVal = bestHands[plr_maxtPairVal[0]][1][tPairIdx].getValue();
                    if (challenging2pairVal > current2pairVal) {
                        plr_maxtPairVal[0] = i;
                        largestHands = [];
                        largestHands.push(bestHands[i]);
                    }
                    else if (challenging2pairVal === current2pairVal) {
                        largestHands.push(bestHands[i]);
                    }
                }
            }
            return largestHands;
        }
        //for 3 of a kind do highest 3 of a kind and 4 of a kind DONE
        //for straight it's highest straight card - DONE
        //for flush it's highest matching suit, if u have ace of that suit it's the best flush, a nut flush - DONE
        //full house, it's the highest 3k, if that's the same it's the highest pair DONE
        //straight flush is highest card wins - DONE
        //royal flush means only one player has won

        //should never reach here, but for debugging purposes:
        console.error("mutiple hands left but none of above conditions satisfied");
        return bestHands;
    }

/**
 * Find the best texas holdem hand from card combinations
 * Note: Assumes that only combinations are given and no card repeats
 * Typical use case is 7Cr5 combinations of cards, so 21 possible Card arrays
 * @param {Array<Array<Card>>} possibleCards a set of cards to determine the best hand
 * @return {[Array<Card>,object]} tuple containing element within possibleCards param and corresponding Category
 */
    public findBestHand(possibleCards:Array<Array<Card>>) {
        let bestIndex = BestHand.CategoryList.findIndex(obj => obj.categoryName === "High Card");
        let tiedCardArray = []; //to handle duplicate best ranks
        for (let cardArray of possibleCards) {
            let categoryIndex = this.getCategoryIndex(cardArray.map(c => c.getValue()), cardArray.map(c => c.getSuit()));
            if (BestHand.CategoryList[categoryIndex].rank > BestHand.CategoryList[bestIndex].rank) {
                bestIndex = categoryIndex;
                tiedCardArray = [];
                tiedCardArray.push(cardArray.sort((a,b) => b.getValue() - a.getValue()));
            }
            else if (BestHand.CategoryList[categoryIndex].rank === BestHand.CategoryList[bestIndex].rank) {
                tiedCardArray.push(cardArray.sort((a,b) => b.getValue() - a.getValue()));
            }
        }
        if (tiedCardArray.length === 1) return [tiedCardArray[0], BestHand.CategoryList[bestIndex]];
        //handle multiple best cards
        let maxVal = 0;
        let finalIndex = 0;
        for (let i = 0; i < tiedCardArray.length; i++) {
            let totalCardValue = tiedCardArray[i].map(card => card.getValue()).reduce((acc, val) => {
                return acc + val;
            });
            if (totalCardValue > maxVal) {
                maxVal = totalCardValue;
                finalIndex = i;
            }
        }
        return [tiedCardArray[finalIndex], BestHand.CategoryList[bestIndex]];
    }

    /**
* Generate all combinations of an array.
* @param {Array<Card>} sourceArray - Array of input elements.
* @param {number} comboLength - Desired length of combinations.
* @return {Array<Card>} Array of combination arrays.
*/
   private generateCombinations(sourceArray: Array<Card>, comboLength:number) {
     const sourceLength = sourceArray.length;
     if (comboLength > sourceLength) return [];
   
     const combos = new Array<Array<Card>>(); // Stores valid combinations as they are generated.
   
     // Accepts a partial combination, an index into sourceArray, 
     // and the number of elements required to be added to create a full-length combination.
     // Called recursively to build combinations, adding subsequent elements at each call depth.
     const makeNextCombos = (workingCombo:Array<Card>, currentIndex:number, remainingCount:number) => {
       const oneAwayFromComboLength = remainingCount == 1;
   
       // For each element that remaines to be added to the working combination.
       for (let sourceIndex = currentIndex; sourceIndex < sourceLength; sourceIndex++) {
         // Get next (possibly partial) combination.
         const next = [ ...workingCombo, sourceArray[sourceIndex] ];
   
         if (oneAwayFromComboLength) {
           // Combo of right length found, save it.
           combos.push(next);
         }
         else {
           // Otherwise go deeper to add more elements to the current partial combination.
           makeNextCombos(next, sourceIndex + 1, remainingCount - 1);
         }
           }
     }
   
     makeNextCombos([], 0, comboLength);
     return combos;
   }

/* function adapted from subskybox (https://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math)
 * utilizes bitwise mapping to find poker category in specfic order above
 * input: cs, array of 5 numbers representing card rank with 14 representing Ace
 * ss, array of 5 numbers representing card suit
 * output: index corresponding to static category array above. Warning: Do not change order of array or this
 * function will no longer work as expected. See test in engineTests for validation
*/
    public getCategoryIndex(cs:Array<number>, ss:Array<number>) : number {
        let v, i, o, s = 1<<cs[0]|1<<cs[1]|1<<cs[2]|1<<cs[3]|1<<cs[4];
        for (i=-1, v=o=0; i<5; i++, o=Math.pow(2,cs[i]*4)) {v += o*((v/o&15)+1);}
        v = v % 15 - ((s/(s&-s) == 31) || (s == 0x403c) ? 3 : 1);
        v -= Number(ss[0] == (ss[1]|ss[2]|ss[3]|ss[4])) * ((s == 0x7c00) ? -5 : 1);
        return v;
    }

/**
 * assumes there is only one unique card and that the array is sorted
 * @param cards array of 5 cards with 2 pairs
 * @return card value of unique card in set
 */
    private getDistinctCardVal(cards:Array<Card>) {
        let cardVals = cards.map(c => c.getValue());
        if (cardVals[0] !== cardVals[1]) {
            return cardVals[0];
        }
        if (cardVals[cardVals.length-1] !== cardVals[cardVals.length-2]) {
            return cardVals[cardVals.length-1];
        }
        return cardVals[2];
    }
/**
 * assumes there is only one pair and that the array is sorted
 * @param cards array of 5 cards with 1 pair
 * @return card value of one of the pair cards
 */
    private getSinglePairVal(cards:Array<Card>) {
        let cardVals = cards.map(c => c.getValue());
        //two checks, penultimate and second-first positions
        if (cardVals[1] === cardVals[0] || cardVals[1] === cardVals[2]) {
            return cardVals[1];
        }
        //must be penultimate if above condition isn't met
        return cardVals[3];
    }
/**
 * Determine the starting index of the 3 pair of a full house
 * Two states: either 33322 or 44333.
 * warning: functions assums param is sorted full house
 * @param cards array of 5 cards that represent a sorted full house
 */
    private getTripsIndex(cards:Array<Card>) {
        let cardVals = cards.map(c => c.getValue());
        if (cardVals[1] === cardVals[2]) {
            return 0;
        }
        return 2;
    }
}
