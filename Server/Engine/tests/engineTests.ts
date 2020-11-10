import { PokerGame } from '../Pokergame';
import { Player } from '../Player';
import { expect } from 'chai';
import { describe } from 'mocha'; 

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
});