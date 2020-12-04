import { Request, Response, NextFunction } from 'express'
import { User, } from '../entities'
import { PokerGame } from '../utils/Engine/PokerGame'
import {  Player } from '../utils/Engine/Player'
import { Pubsub } from '../websocket'
import { GameRender } from '../utils/Engine/GameRender'
let games : PokerGame[] = [];

export async function openLobby(req: Request, res: Response, next: NextFunction) {
    try{
        let game = games.find(me => me.host === req.body.username)
        if(game){
            res.json({
            message: 'exsists', 
            gameId: game.id,
            isStarted: game.started
        })
        }else{
                let pokerGame = new PokerGame(req.body.username, req.body.stackSize, req.body.blindTimer, req.body.name, req.body.password)
                pokerGame.addPlayer(new Player(req.body.username))
                games.push(pokerGame)
                const pubsub = Pubsub.getInstance()
                await pubsub.post('newGame', {game: pokerGame})
                res.json({gameId: pokerGame.id})

        }
    }
    catch(err){
        console.log(err)
        res.json('fail')
    }
}

export async function start(req: Request, res: Response, next: NextFunction)
{
    try{
        let gameid = req.body.gameId;
        let game = games.find(game => game.id == gameid);
        game.start();
        const pubsub = Pubsub.getInstance()
        await pubsub.post(`${gameid}/pokerLobbyStart`, {game: game})
        res.json('success');
    }
    catch(err){
        res.json('fail');
    }
}

export async function getRendering(req: Request, res: Response, next: NextFunction)
{
    let gameid = req.body.gameId;
    let username = req.body.username;
    let game = games.find(game => game.id == gameid);
    if(game != null)
    {
        let gameRender = game.getGameRender();
        let activePlayer = gameRender.getActivePlayer();
        if(game.useShowdownRender())
        {
            gameRender = game.getShowdownRender();
            activePlayer = null;
        }

        let players = [];
        
        for( let [player, handStatus] of gameRender.getHandStatusMap() )
        {
            let tempobj = {};
            tempobj["name"] = player.getName();
            tempobj["stackSize"] = handStatus.getStackSize();
            tempobj["betChips"] = handStatus.getBetChips();
            if(player.getName() === username || (game.useShowdownRender()) && !handStatus.isFolded())
            {
                tempobj["holeCards"] = handStatus.getHoleCards();
            }
            tempobj["isFolded"] = handStatus.isFolded();
            tempobj["isAllIn"] = handStatus.isAllIn();
            players.push(tempobj);
        }

        res.json({
            potSize: gameRender.getPotsize(),
            activePlayer: activePlayer,
            blinds: {
                smallBlind: gameRender.getBlinds().getSmallBlind(),
                bigBlind: gameRender.getBlinds().getBigBlind(),
                blindTimer: gameRender.getBlindTimer(),
                currentHandBigBlind: gameRender.getCurrentHandBigBlind()
            },
            players: players,
            board: gameRender.getBoard(),
            isBetOut: gameRender.isBetOut()
        });
    }
    else
    {
        res.json('failure');
    }
}

export async function call(req: Request, res: Response, next: NextFunction) {
    let gameid = req.body.gameId;
    let username = req.body.username;
    let game = games.find(game => game.id == gameid);
    let player = null;
    if(game != null)
    {
        let keys :Player[] = Array.from( game.stackMap.keys() );
        for(let i = 0; i < keys.length; i++){
            if(keys[i].name === username){
                player = keys[i];
            }
        }
    }
    if(player != null)
    {
        game.call(player);
        if(game.useShowdownRender())
        {
            let inter = setInterval(async () => {
                game.setUseShowdownRender(false);
                checkWin(gameid);
                const pubsub = Pubsub.getInstance()
                await pubsub.post(`${gameid}/renderGame`, {game: game})
                clearInterval(inter);
            }, 5000);
        }
        const pubsub = Pubsub.getInstance()
        await pubsub.post(`${gameid}/renderGame`, {game: game})
        res.json('success');
    }
    else
    {
        res.json('failure');
    }
}

export async function bet(req: Request, res: Response, next: NextFunction) {
    let gameid = req.body.gameId;
    let username = req.body.username;
    let game = games.find(game => game.id == gameid);
    let player = null;
    let amount = req.body.amount;
    if(game != null)
    {
        let keys :Player[] = Array.from( game.stackMap.keys() );
        for(let i = 0; i < keys.length; i++){
            if(keys[i].name === username){
                player = keys[i];
            }
        }
    }
    if(player != null)
    {
        game.bet(player, amount);
        if(game.useShowdownRender())
        {
            let inter = setInterval(async () => {
                game.setUseShowdownRender(false);
                checkWin(gameid);
                const pubsub = Pubsub.getInstance()
                await pubsub.post(`${gameid}/renderGame`, {game: game})
                clearInterval(inter);
            }, 5000);
        }
        const pubsub = Pubsub.getInstance()
        await pubsub.post(`${gameid}/renderGame`, {game: game})
        res.json('success');
    }
    else
    {
        res.json('failure');
    }
}


export async function newPlayer(req: Request, res: Response, next: NextFunction) {
    try{
        let game = null
        for(let i = 0; i < games.length; i++){
            if(games[i].id === req.body.gameId){
                game = games[i]
                games[i].addPlayer(new Player(req.body.username))
            }
        }
        const pubsub = Pubsub.getInstance()
        await pubsub.post(`${req.body.gameId}/pokerLobby`, {
            username: req.body.username,
            id: req.body.gameId
        })
        res.json('success')
    }
    catch(err){
        res.json('fail')
    }
}
export async function kickPlayer(req: Request, res: Response, next: NextFunction) {
    try{
        let game = null
        for(let i = 0; i < games.length; i++){
            if(games[i].id === req.body.gameId){
                game = games[i]
            }
        }
         const pubsub = Pubsub.getInstance()
         await pubsub.post(`${req.body.gameId}/pokerLobbyLeave`, {
             username: req.body.username,
             id: req.body.gameId
        })
        await pubsub.post(`${req.body.username}/kicked`, 'success')
        if(game != null)
        {
            let keys :Player[] = Array.from( game.stackMap.keys() );
            for(let i = 0; i < keys.length; i++){
                if(keys[i].name === req.body.username){
                    console.log(keys[i])
                    game.removePlayer(keys[i])
                }
            }
            res.json('success')
        }
        else
        {
            res.json('failure')
        }

    }catch(err){
        res.json('already gone')
    }

}
export async function fetchPlayers(req: Request, res: Response, next: NextFunction) {

    let game = null
    for(let i = 0; i < games.length; i++){
        if(games[i].id === req.body.gameId){
            game = games[i]
        }
    }
    if(game != null)
    {
        let keys = Array.from( game.stackMap.keys() );
        console.log(keys)
        res.json({
            players: keys,
            isStarted: game.started
        })
    }
    else
    {
        res.json('failure');
    }
}

export async function fold(req: Request, res: Response, next: NextFunction) {
    let gameid = req.body.gameId;
    let username = req.body.username;
    let game = games.find(game => game.id == gameid);
    let player = null;
    if(game != null)
    {
        let keys :Player[] = Array.from( game.stackMap.keys() );
        for(let i = 0; i < keys.length; i++){
            if(keys[i].name === username){
                player = keys[i];
            }
        }
    }
    if(player != null)
    {
        game.fold(player);
        if(game.useShowdownRender())
        {
            let inter = setInterval(async () => {
                game.setUseShowdownRender(false);
                checkWin(gameid);
                const pubsub = Pubsub.getInstance()
                await pubsub.post(`${gameid}/renderGame`, {game: game})
                clearInterval(inter);
            }, 5000);
        }
        const pubsub = Pubsub.getInstance()
        await pubsub.post(`${gameid}/renderGame`, {game: game})
        res.json('success');
    }
    else
    {
        res.json('failure');
    }
}

export async function check(req: Request, res: Response, next: NextFunction) {
    let gameid = req.body.gameId;
    let username = req.body.username;
    let game = games.find(game => game.id == gameid);
    let player = null;
    if(game != null)
    {
        let keys :Player[] = Array.from( game.stackMap.keys() );
        for(let i = 0; i < keys.length; i++){
            if(keys[i].name === username){
                player = keys[i];
            }
        }
    }
    if(player != null)
    {
        game.check(player);
        if(game.useShowdownRender())
        {
            let inter = setInterval(async () => {
                game.setUseShowdownRender(false);
                checkWin(gameid);
                const pubsub = Pubsub.getInstance()
                await pubsub.post(`${gameid}/renderGame`, {game: game})
                clearInterval(inter);
            }, 5000);
        }
        const pubsub = Pubsub.getInstance()
        await pubsub.post(`${gameid}/renderGame`, {game: game})
        res.json('success');
    }
    else
    {
        res.json('failure');
    }
}


export async function closeLobby(req: Request, res: Response, next: NextFunction) {
    try{
        let cancelledGame = games.filter(game => game.id !== req.body.gameId)
        games = cancelledGame
        const pubsub = Pubsub.getInstance()
        await pubsub.post('endGame', {id: req.body.gameId})
        await pubsub.post(`${req.body.gameId}/pokerLobbyEnd`, {id: req.body.gameId})
        res.json('success')
    }
    catch(err){
        res.json('fail') 
    }

    
}
export async function fetchGames(req: Request, res: Response, next: NextFunction) {
    try{
        let notStartedGames = games.filter(game=> game.started === false)
        res.json(notStartedGames)
    }
    catch(err){
        res.json('fail')
    }
}
 async function checkWin(gameId) {
    let game = games.find(game => game.id == gameId)
    let counter = 0
    let potentalWinner = null
    let keys : Player[] = Array.from( game.stackMap.keys() );
    for(let i = 0; i < keys.length; i++){
        if(game.stackMap.get(keys[i]) > 0){
            counter++
            potentalWinner = keys[i]
        }
     }
    if(counter === 1){
        console.log("the game is won ")
        console.log("the winner is: ", potentalWinner.name)
        const pubsub = Pubsub.getInstance()
        let user = await User.createQueryBuilder('user')
        .where("user.username = :username",{
            username: potentalWinner.name,
        })
        .getOne()
        user.wins++
        user.save()
        let cancelledGame = games.filter(game => game.id !== gameId)
        games = cancelledGame
        await pubsub.post(`${gameId}/gameOver`, {message: 'gameover'})
    }
}