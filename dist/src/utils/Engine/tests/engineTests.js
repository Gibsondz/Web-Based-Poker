"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pokergame_1 = require("../Pokergame");
const Player_1 = require("../Player");
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const BestHand_1 = require("../BestHand");
const Card_1 = require("../Card");
mocha_1.describe('Poker Game Scenerios', () => {
    it('Basic Sample Hand', () => {
        let game = new Pokergame_1.PokerGame(3000, 900);
        let Bob = new Player_1.Player("Bob");
        let Bill = new Player_1.Player("Bill");
        let Clad = new Player_1.Player("Clad");
        let Thad = new Player_1.Player("Thad");
        let Brad = new Player_1.Player("Brad");
        let Chad = new Player_1.Player("Chad");
        let Tack = new Player_1.Player("Tack");
        let Lim = new Player_1.Player("Lim");
        let Jill = new Player_1.Player("Jill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        game.addPlayer(Jill);
        game.addPlayer(Lim);
        game.addPlayer(Tack);
        game.addPlayer(Chad);
        game.addPlayer(Brad);
        game.addPlayer(Thad);
        game.addPlayer(Clad);
        game.addPlayer(new Player_1.Player("I shouldnt be able to be added."));
        game.start();
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true; //Action Right
        game.bet(Clad, 60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Brad").to.be.true;
        game.fold(Brad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Brad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Brad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Chad").to.be.true;
        game.fold(Chad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Chad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Chad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Lim").to.be.true;
        game.fold(Lim);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Lim).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Jill").to.be.true;
        game.fold(Jill);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Jill).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.fold(Bill);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.call(Bob);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(255);
        //Flop
        game.bet(Bob, 50);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(50);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.fold(Clad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Thad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(355);
        game.check(Bob);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isChecked()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.check(Tack);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(355);
        game.check(Bob);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isChecked()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.check(Tack);
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(0); //New hand has started pot is now 0
    });
    it('Hand With Legal Raises/Out of Turn Fold/Won by flop fold', () => {
        let game = new Pokergame_1.PokerGame(3000, 900);
        let Bob = new Player_1.Player("Bob");
        let Bill = new Player_1.Player("Bill");
        let Clad = new Player_1.Player("Clad");
        let Thad = new Player_1.Player("Thad");
        let Brad = new Player_1.Player("Brad");
        let Chad = new Player_1.Player("Chad");
        let Tack = new Player_1.Player("Tack");
        let Lim = new Player_1.Player("Lim");
        let Jill = new Player_1.Player("Jill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        game.addPlayer(Jill);
        game.addPlayer(Lim);
        game.addPlayer(Tack);
        game.addPlayer(Chad);
        game.addPlayer(Brad);
        game.addPlayer(Thad);
        game.addPlayer(Clad);
        game.addPlayer(new Player_1.Player("I shouldnt be able to be added."));
        game.start();
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true; //Action Right
        game.bet(Clad, 60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Brad").to.be.true;
        game.fold(Brad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Brad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Brad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Chad").to.be.true;
        game.fold(Chad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Chad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Chad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Lim").to.be.true;
        game.fold(Lim);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Lim).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Jill").to.be.true;
        game.fold(Jill);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Jill).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.fold(Bill);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 180);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(180);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.call(Clad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(180);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Tack); //Out of turn fold should be ignored
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Thad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.fold(Tack);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(495);
        //Flop
        game.bet(Bob, 200);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(200);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.fold(Clad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getStackSize()).to.equal(3300);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(15); //Bob should be small blind now
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(0);
    });
    it('Side Pots Test', () => {
        let game = new Pokergame_1.PokerGame(3000, 900);
        let Bob = new Player_1.Player("Bob");
        let Bill = new Player_1.Player("Bill");
        let Clad = new Player_1.Player("Clad");
        let Thad = new Player_1.Player("Thad");
        let Brad = new Player_1.Player("Brad");
        let Chad = new Player_1.Player("Chad");
        let Tack = new Player_1.Player("Tack");
        let Lim = new Player_1.Player("Lim");
        let Jill = new Player_1.Player("Jill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        game.addPlayer(Jill);
        game.addPlayer(Lim);
        game.addPlayer(Tack);
        game.addPlayer(Chad);
        game.addPlayer(Brad);
        game.addPlayer(Thad);
        game.addPlayer(Clad);
        game.addPlayer(new Player_1.Player("I shouldnt be able to be added."));
        game.start();
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true; //Action Right
        game.bet(Clad, 60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Brad").to.be.true;
        game.fold(Brad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Brad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Brad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Chad").to.be.true;
        game.fold(Chad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Chad).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Chad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Lim").to.be.true;
        game.fold(Lim);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Lim).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Jill").to.be.true;
        game.fold(Jill);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Jill).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.fold(Bill);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 500);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(500);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.call(Clad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(500);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Tack); //Out of turn fold should be ignored
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Thad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.fold(Tack);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.true;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(1135);
        //Flop
        game.bet(Bob, 200);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(200);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.fold(Clad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getStackSize()).to.equal(3620);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getStackSize()).to.equal(2470);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(15); //Bob should be small blind now
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(30); //Clad is big blind now
        chai_1.expect(game.getGameRender().getPotsize()).to.equal(0);
        //Setup complete will now run side pot hand.
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.bet(Thad, 500);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(500);
        game.fold(Brad);
        game.fold(Chad);
        game.fold(Tack);
        game.fold(Lim);
        game.fold(Jill);
        game.fold(Bill);
        game.call(Bob);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(500);
        game.bet(Clad, 2600); //Overbet more than his stack should be treated like an all in
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(2500);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Clad).getStackSize()).to.equal(0);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(2500);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Thad).getStackSize()).to.equal(440);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 4000); //Overbet more than his stack should be treated like an all in
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(3635);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getStackSize()).to.equal(0);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad); //Hand is now finished with 2 all-ins and call from Bob.
        //new hand now (Can't test much new hand conditions because of outcomes of the all in would change stuff.)
        //If this test doesn't have any exceptions and the output text for determining pot winners looks correct it should be fine.
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0); //These tests just ensure the hand completed.
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.false;
    });
    it('Heads up hand test', () => {
        let game = new Pokergame_1.PokerGame(3000, 900);
        let Bob = new Player_1.Player("Bob");
        let Bill = new Player_1.Player("Bill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        game.start();
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true; //Action Right
        game.bet(Bill, 90);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(90);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.call(Bob);
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(0);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 4000); //All in
        chai_1.expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(2910);
        chai_1.expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.call(Bill);
        //Game over.
        //expect(game.isFinished()).to.be.true; -> cannot do this because of split pots. If this was implemented it should work the vast majority of the time though.
    });
});
mocha_1.describe('Test Declare Winner Functionality', () => {
    it('Test getCategoryIndex function', () => {
        let pokerGame = new Pokergame_1.PokerGame(3000, 900);
        let Bob = new Player_1.Player("Bob");
        let John = new Player_1.Player("John");
        pokerGame.addPlayer(Bob);
        pokerGame.addPlayer(John);
        pokerGame.start();
        //check if board one is a royal flush
        let board1 = [
            new Card_1.Card(10 /* Ten */, 1 /* Spade */),
            new Card_1.Card(11 /* Jack */, 1 /* Spade */),
            new Card_1.Card(12 /* Queen */, 1 /* Spade */),
            new Card_1.Card(13 /* King */, 1 /* Spade */),
            new Card_1.Card(14 /* Ace */, 1 /* Spade */)
        ];
        let checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board1);
        chai_1.expect(checkBestHand.getCategoryIndex(board1.map(c => c.getValue()), board1.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Royal Flush" /* RF */));
        //check if board two is a straight flush
        let board2 = [
            new Card_1.Card(4 /* Four */, 1 /* Spade */),
            new Card_1.Card(5 /* Five */, 1 /* Spade */),
            new Card_1.Card(6 /* Six */, 1 /* Spade */),
            new Card_1.Card(7 /* Seven */, 1 /* Spade */),
            new Card_1.Card(8 /* Eight */, 1 /* Spade */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board2);
        chai_1.expect(checkBestHand.getCategoryIndex(board2.map(c => c.getValue()), board2.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Straight Flush" /* SF */));
        //check if board is a straight flush
        let board = [
            new Card_1.Card(2 /* Two */, 1 /* Spade */),
            new Card_1.Card(3 /* Three */, 1 /* Spade */),
            new Card_1.Card(4 /* Four */, 1 /* Spade */),
            new Card_1.Card(5 /* Five */, 1 /* Spade */),
            new Card_1.Card(14 /* Ace */, 1 /* Spade */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Straight Flush" /* SF */));
        //check if board is Four of a Kind
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(8 /* Eight */, 2 /* Club */),
            new Card_1.Card(8 /* Eight */, 4 /* Heart */),
            new Card_1.Card(8 /* Eight */, 8 /* Diamond */),
            new Card_1.Card(9 /* Nine */, 1 /* Spade */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Four of a Kind" /* FK */));
        //check if board is Full House
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(8 /* Eight */, 2 /* Club */),
            new Card_1.Card(8 /* Eight */, 4 /* Heart */),
            new Card_1.Card(9 /* Nine */, 8 /* Diamond */),
            new Card_1.Card(9 /* Nine */, 1 /* Spade */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Full House" /* FH */));
        //check if board is Flush
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(10 /* Ten */, 1 /* Spade */),
            new Card_1.Card(11 /* Jack */, 1 /* Spade */),
            new Card_1.Card(9 /* Nine */, 1 /* Spade */),
            new Card_1.Card(6 /* Six */, 1 /* Spade */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Flush" /* FL */));
        //check if board is Straight
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(10 /* Ten */, 1 /* Spade */),
            new Card_1.Card(11 /* Jack */, 1 /* Spade */),
            new Card_1.Card(9 /* Nine */, 1 /* Spade */),
            new Card_1.Card(7 /* Seven */, 8 /* Diamond */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Straight" /* ST */));
        //check if board is Straight
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(10 /* Ten */, 1 /* Spade */),
            new Card_1.Card(11 /* Jack */, 1 /* Spade */),
            new Card_1.Card(9 /* Nine */, 1 /* Spade */),
            new Card_1.Card(12 /* Queen */, 8 /* Diamond */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Straight" /* ST */));
        //check if board is Three of a Kind
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(8 /* Eight */, 2 /* Club */),
            new Card_1.Card(8 /* Eight */, 4 /* Heart */),
            new Card_1.Card(9 /* Nine */, 8 /* Diamond */),
            new Card_1.Card(10 /* Ten */, 1 /* Spade */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Three of a Kind" /* TK */));
        //check if board is Two Pair
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(8 /* Eight */, 2 /* Club */),
            new Card_1.Card(6 /* Six */, 4 /* Heart */),
            new Card_1.Card(9 /* Nine */, 8 /* Diamond */),
            new Card_1.Card(9 /* Nine */, 1 /* Spade */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "Two Pair" /* TP */));
        //check if board is One Pair
        board = [
            new Card_1.Card(8 /* Eight */, 1 /* Spade */),
            new Card_1.Card(10 /* Ten */, 1 /* Spade */),
            new Card_1.Card(11 /* Jack */, 1 /* Spade */),
            new Card_1.Card(7 /* Seven */, 1 /* Spade */),
            new Card_1.Card(7 /* Seven */, 8 /* Diamond */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "One Pair" /* OP */));
        //check if board is High Card
        board = [
            new Card_1.Card(14 /* Ace */, 1 /* Spade */),
            new Card_1.Card(10 /* Ten */, 1 /* Spade */),
            new Card_1.Card(11 /* Jack */, 1 /* Spade */),
            new Card_1.Card(9 /* Nine */, 1 /* Spade */),
            new Card_1.Card(7 /* Seven */, 8 /* Diamond */)
        ];
        checkBestHand = new BestHand_1.BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        chai_1.expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()), board.map(c => c.getSuit()))).to.equal(BestHand_1.BestHand.CategoryList.findIndex(e => e.categoryName === "High Card" /* HC */));
    });
});
