import { Request, Response, NextFunction } from 'express'
import { User, } from '../entities'
import { PokerGame } from '../utils/Engine/PokerGame'
import {  Player } from '../utils/Engine/Player'
import { Pubsub } from '../websocket'
let games : PokerGame[] = [];

export async function openLobby(req: Request, res: Response, next: NextFunction) {
    let game = games.find(me => me.host === req.body.username)
    if(game){
        res.json({
        message: 'exsists', 
        gameId: game.id })
    }else{
        
            let pokerGame = new PokerGame(req.body.username, req.body.stackSize, req.body.blindTimer, req.body.name, req.body.password)
            pokerGame.addPlayer(new Player(req.body.username))
            games.push(pokerGame)
            const pubsub = Pubsub.getInstance()
            await pubsub.post('newGame', {game: pokerGame})
            res.json({gameId: pokerGame.id})

    }
}
export async function call(req: Request, res: Response, next: NextFunction) {


}
export async function newPlayer(req: Request, res: Response, next: NextFunction) {
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
export async function kickPlayer(req: Request, res: Response, next: NextFunction) {
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
    console.log(game.stackMap)
    let keys :Player[] = Array.from( game.stackMap.keys() );
    for(let i = 0; i < keys.length; i++){
        if(keys[i].name === req.body.username){
            console.log(keys[i])
            game.removePlayer(keys[i])

        }
    }
    res.json('success')

}
export async function fetchPlayers(req: Request, res: Response, next: NextFunction) {

    let game = null
    for(let i = 0; i < games.length; i++){
        if(games[i].id === req.body.gameId){
            game = games[i]
        }
    }
    let keys = Array.from( game.stackMap.keys() );
    console.log(keys)
    res.json(keys)


}
export async function fold(req: Request, res: Response, next: NextFunction) {



}
export async function closeLobby(req: Request, res: Response, next: NextFunction) {
    let cancelledGame = games.filter(game => game.id !== req.body.gameId)
    games = cancelledGame
    const pubsub = Pubsub.getInstance()
    await pubsub.post('endGame', {id: req.body.gameId})
    res.json('success')

    
}
export async function fetchGames(req: Request, res: Response, next: NextFunction) {
    res.json(games)
}