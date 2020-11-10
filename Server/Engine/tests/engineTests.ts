import { PokerGame } from '../Pokergame';
import { Player } from '../Player';
import { expect } from 'chai';
import { describe } from 'mocha'; 
import { BestHand } from '../BestHand';
import { Card } from '../Card';
import { CardValue } from '../CardValue';
import { Suit } from '../Suit';
import { Categories } from '../Categories';

describe('Poker Game Scenerios', () => { //Test container for poker game scenarios
    it('Basic Sample Hand', () => {
        let game = new PokerGame(3000, 900);
        let Bob = new Player("Bob");
        let Bill = new Player("Bill");
        let Clad = new Player("Clad");
        let Thad = new Player("Thad");
        let Brad = new Player("Brad");
        let Chad = new Player("Chad");
        let Tack = new Player("Tack");
        let Lim = new Player("Lim");
        let Jill = new Player("Jill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        game.addPlayer(Jill);
        game.addPlayer(Lim);
        game.addPlayer(Tack);
        game.addPlayer(Chad);
        game.addPlayer(Brad);
        game.addPlayer(Thad);
        game.addPlayer(Clad);
        
        game.addPlayer(new Player("I shouldnt be able to be added."));
        game.start();

        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true; //Action Right
        game.bet(Clad, 60);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getActivePlayer().getName() == "Brad").to.be.true;
        game.fold(Brad);
        expect(game.getGameRender().getHandStatusMap().get(Brad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Brad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Chad").to.be.true;
        game.fold(Chad);
        expect(game.getGameRender().getHandStatusMap().get(Chad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Chad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        expect(game.getGameRender().getHandStatusMap().get(Tack).getBetChips()).to.equal(60);
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Lim").to.be.true;
        game.fold(Lim);
        expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Lim).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Jill").to.be.true;
        game.fold(Jill);
        expect(game.getGameRender().getHandStatusMap().get(Jill).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.fold(Bill);
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15);
        expect(game.getGameRender().getHandStatusMap().get(Bill).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.call(Bob);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;

        expect(game.getGameRender().getPotsize()).to.equal(255);

        //Flop
        game.bet(Bob, 50);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(50);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.fold(Clad);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Clad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Thad);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Thad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;

        expect(game.getGameRender().getPotsize()).to.equal(355);

        game.check(Bob);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isChecked()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.check(Tack);
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;

        expect(game.getGameRender().getPotsize()).to.equal(355);

        game.check(Bob);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isChecked()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.check(Tack);

        expect(game.getGameRender().getPotsize()).to.equal(0); //New hand has started pot is now 0
    });

    it('Hand With Legal Raises/Out of Turn Fold/Won by flop fold', () => {
        let game = new PokerGame(3000, 900);
        let Bob = new Player("Bob");
        let Bill = new Player("Bill");
        let Clad = new Player("Clad");
        let Thad = new Player("Thad");
        let Brad = new Player("Brad");
        let Chad = new Player("Chad");
        let Tack = new Player("Tack");
        let Lim = new Player("Lim");
        let Jill = new Player("Jill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        game.addPlayer(Jill);
        game.addPlayer(Lim);
        game.addPlayer(Tack);
        game.addPlayer(Chad);
        game.addPlayer(Brad);
        game.addPlayer(Thad);
        game.addPlayer(Clad);
        
        game.addPlayer(new Player("I shouldnt be able to be added."));
        game.start();

        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true; //Action Right
        game.bet(Clad, 60);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getActivePlayer().getName() == "Brad").to.be.true;
        game.fold(Brad);
        expect(game.getGameRender().getHandStatusMap().get(Brad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Brad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Chad").to.be.true;
        game.fold(Chad);
        expect(game.getGameRender().getHandStatusMap().get(Chad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Chad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        expect(game.getGameRender().getHandStatusMap().get(Tack).getBetChips()).to.equal(60);
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Lim").to.be.true;
        game.fold(Lim);
        expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Lim).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Jill").to.be.true;
        game.fold(Jill);
        expect(game.getGameRender().getHandStatusMap().get(Jill).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.fold(Bill);
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15);
        expect(game.getGameRender().getHandStatusMap().get(Bill).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 180);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(180);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.call(Clad);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(180);
        expect(game.getGameRender().getHandStatusMap().get(Clad).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Tack); //Out of turn fold should be ignored
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Thad);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getHandStatusMap().get(Thad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.fold(Tack);
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;

        expect(game.getGameRender().getPotsize()).to.equal(495);

        //Flop
        game.bet(Bob, 200);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(200);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.fold(Clad);

        expect(game.getGameRender().getHandStatusMap().get(Bob).getStackSize()).to.equal(3300);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(15); //Bob should be small blind now
        expect(game.getGameRender().getPotsize()).to.equal(0);

    });

    it('Side Pots Test', () => {
        let game = new PokerGame(3000, 900);
        let Bob = new Player("Bob");
        let Bill = new Player("Bill");
        let Clad = new Player("Clad");
        let Thad = new Player("Thad");
        let Brad = new Player("Brad");
        let Chad = new Player("Chad");
        let Tack = new Player("Tack");
        let Lim = new Player("Lim");
        let Jill = new Player("Jill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        game.addPlayer(Jill);
        game.addPlayer(Lim);
        game.addPlayer(Tack);
        game.addPlayer(Chad);
        game.addPlayer(Brad);
        game.addPlayer(Thad);
        game.addPlayer(Clad);
        
        game.addPlayer(new Player("I shouldnt be able to be added."));
        game.start();

        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true; //Action Right
        game.bet(Clad, 60);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getActivePlayer().getName() == "Brad").to.be.true;
        game.fold(Brad);
        expect(game.getGameRender().getHandStatusMap().get(Brad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Brad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Chad").to.be.true;
        game.fold(Chad);
        expect(game.getGameRender().getHandStatusMap().get(Chad).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Chad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.call(Tack);
        expect(game.getGameRender().getHandStatusMap().get(Tack).getBetChips()).to.equal(60);
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Lim").to.be.true;
        game.fold(Lim);
        expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Lim).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Jill").to.be.true;
        game.fold(Jill);
        expect(game.getGameRender().getHandStatusMap().get(Jill).getBetChips()).to.equal(0);
        expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.fold(Bill);
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15);
        expect(game.getGameRender().getHandStatusMap().get(Bill).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 500);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(500);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.call(Clad);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(500);
        expect(game.getGameRender().getHandStatusMap().get(Clad).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Tack); //Out of turn fold should be ignored
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.fold(Thad);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(60);
        expect(game.getGameRender().getHandStatusMap().get(Thad).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Tack").to.be.true;
        game.fold(Tack);
        expect(game.getGameRender().getHandStatusMap().get(Tack).isFolded()).to.be.true;
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;

        expect(game.getGameRender().getPotsize()).to.equal(1135);

        //Flop
        game.bet(Bob, 200);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(200);
        expect(game.getGameRender().getHandStatusMap().get(Bob).isFolded()).to.be.false;
        expect(game.getGameRender().getActivePlayer().getName() == "Clad").to.be.true;
        game.fold(Clad);

        expect(game.getGameRender().getHandStatusMap().get(Bob).getStackSize()).to.equal(3620);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getStackSize()).to.equal(2470);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(15); //Bob should be small blind now
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(30); //Clad is big blind now
        expect(game.getGameRender().getPotsize()).to.equal(0);

        //Setup complete will now run side pot hand.
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.bet(Thad, 500);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(500);
        game.fold(Brad);
        game.fold(Chad);
        game.fold(Tack);
        game.fold(Lim);
        game.fold(Jill);
        game.fold(Bill);
        game.call(Bob);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(500);
        game.bet(Clad, 2600); //Overbet more than his stack should be treated like an all in
        expect(game.getGameRender().getHandStatusMap().get(Clad).getBetChips()).to.equal(2500);
        expect(game.getGameRender().getHandStatusMap().get(Clad).getStackSize()).to.equal(0);
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getBetChips()).to.equal(2500);
        expect(game.getGameRender().getHandStatusMap().get(Thad).getStackSize()).to.equal(440);
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 4000); //Overbet more than his stack should be treated like an all in
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(3635);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getStackSize()).to.equal(0);
        expect(game.getGameRender().getActivePlayer().getName() == "Thad").to.be.true;
        game.call(Thad); //Hand is now finished with 2 all-ins and call from Bob.

        //new hand now (Can't test much new hand conditions because of outcomes of the all in would change stuff.)
        //If this test doesn't have any exceptions and the output text for determining pot winners looks correct it should be fine.

        expect(game.getGameRender().getHandStatusMap().get(Lim).getBetChips()).to.equal(0); //These tests just ensure the hand completed.
        expect(game.getGameRender().getHandStatusMap().get(Jill).isFolded()).to.be.false;
    });

    it('Heads up hand test', () => {
        let game = new PokerGame(3000, 900);
        let Bob = new Player("Bob");
        let Bill = new Player("Bill");
        game.addPlayer(Bob);
        game.addPlayer(Bill);
        
        game.start();

        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(30); //BB
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(15); //SB
        expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true; //Action Right
        game.bet(Bill, 90);
        expect(game.getGameRender().getHandStatusMap().get(Bill).getBetChips()).to.equal(90);
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.call(Bob);
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(0);
        expect(game.getGameRender().getActivePlayer().getName() == "Bob").to.be.true;
        game.bet(Bob, 4000); //All in
        expect(game.getGameRender().getHandStatusMap().get(Bob).getBetChips()).to.equal(2910);
        expect(game.getGameRender().getActivePlayer().getName() == "Bill").to.be.true;
        game.call(Bill);
        //Game over.
        //expect(game.isFinished()).to.be.true; -> cannot do this because of split pots. If this was implemented it should work the vast majority of the time though.
    });
});


describe('Test Declare Winner Functionality', () => {
    it('Test getCategoryIndex function', () => {
        let pokerGame = new PokerGame(3000,900);
        let Bob = new Player("Bob");
        let John = new Player("John");
        pokerGame.addPlayer(Bob);
        pokerGame.addPlayer(John);
        pokerGame.start();
        //check if board one is a royal flush
        let board1 = [
            new Card(CardValue.Ten,Suit.Spade),
            new Card(CardValue.Jack,Suit.Spade),
            new Card(CardValue.Queen,Suit.Spade),
            new Card(CardValue.King,Suit.Spade),
            new Card(CardValue.Ace,Suit.Spade)];
        let checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board1);
        expect(checkBestHand.getCategoryIndex(board1.map(c => c.getValue()),board1.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.RF));
        //check if board two is a straight flush
        let board2 = [
            new Card(CardValue.Four,Suit.Spade),
            new Card(CardValue.Five,Suit.Spade),
            new Card(CardValue.Six,Suit.Spade),
            new Card(CardValue.Seven,Suit.Spade),
            new Card(CardValue.Eight,Suit.Spade)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board2);
        expect(checkBestHand.getCategoryIndex(board2.map(c => c.getValue()),board2.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.SF));
        //check if board is a straight flush
        let board = [
            new Card(CardValue.Two,Suit.Spade),
            new Card(CardValue.Three,Suit.Spade),
            new Card(CardValue.Four,Suit.Spade),
            new Card(CardValue.Five,Suit.Spade),
            new Card(CardValue.Ace,Suit.Spade)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.SF));
        //check if board is Four of a Kind
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Eight,Suit.Club),
            new Card(CardValue.Eight,Suit.Heart),
            new Card(CardValue.Eight,Suit.Diamond),
            new Card(CardValue.Nine,Suit.Spade)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.FK));
        //check if board is Full House
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Eight,Suit.Club),
            new Card(CardValue.Eight,Suit.Heart),
            new Card(CardValue.Nine,Suit.Diamond),
            new Card(CardValue.Nine,Suit.Spade)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.FH));
        //check if board is Flush
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Ten,Suit.Spade),
            new Card(CardValue.Jack,Suit.Spade),
            new Card(CardValue.Nine,Suit.Spade),
            new Card(CardValue.Six,Suit.Spade)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.FL));
        //check if board is Straight
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Ten,Suit.Spade),
            new Card(CardValue.Jack,Suit.Spade),
            new Card(CardValue.Nine,Suit.Spade),
            new Card(CardValue.Seven,Suit.Diamond)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.ST));
        //check if board is Straight
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Ten,Suit.Spade),
            new Card(CardValue.Jack,Suit.Spade),
            new Card(CardValue.Nine,Suit.Spade),
            new Card(CardValue.Queen,Suit.Diamond)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.ST));
        //check if board is Three of a Kind
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Eight,Suit.Club),
            new Card(CardValue.Eight,Suit.Heart),
            new Card(CardValue.Nine,Suit.Diamond),
            new Card(CardValue.Ten,Suit.Spade)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.TK));
        //check if board is Two Pair
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Eight,Suit.Club),
            new Card(CardValue.Six,Suit.Heart),
            new Card(CardValue.Nine,Suit.Diamond),
            new Card(CardValue.Nine,Suit.Spade)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.TP));
        //check if board is One Pair
        board = [
            new Card(CardValue.Eight,Suit.Spade),
            new Card(CardValue.Ten,Suit.Spade),
            new Card(CardValue.Jack,Suit.Spade),
            new Card(CardValue.Seven,Suit.Spade),
            new Card(CardValue.Seven,Suit.Diamond)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.OP));
        //check if board is High Card
        board = [
            new Card(CardValue.Ace,Suit.Spade),
            new Card(CardValue.Ten,Suit.Spade),
            new Card(CardValue.Jack,Suit.Spade),
            new Card(CardValue.Nine,Suit.Spade),
            new Card(CardValue.Seven,Suit.Diamond)];
        checkBestHand = new BestHand(pokerGame.getGameRender().getHandStatusMap(), board);
        expect(checkBestHand.getCategoryIndex(board.map(c => c.getValue()),board.map(c => c.getSuit()))).to.equal(BestHand.CategoryList.findIndex(e => e.categoryName === Categories.HC));
    });
});
