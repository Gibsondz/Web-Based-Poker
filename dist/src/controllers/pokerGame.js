"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGames = exports.closeLobby = exports.fold = exports.fetchPlayers = exports.kickPlayer = exports.newPlayer = exports.call = exports.openLobby = void 0;
const PokerGame_1 = require("../utils/Engine/PokerGame");
const Player_1 = require("../utils/Engine/Player");
const websocket_1 = require("../websocket");
let games = [];
async function openLobby(req, res, next) {
    let game = games.find(me => me.host === req.body.username);
    if (game) {
        res.json({
            message: 'exsists',
            gameId: game.id
        });
    }
    else {
        let pokerGame = new PokerGame_1.PokerGame(req.body.username, req.body.stackSize, req.body.blindTimer, req.body.name, req.body.password);
        pokerGame.addPlayer(new Player_1.Player(req.body.username));
        games.push(pokerGame);
        const pubsub = websocket_1.Pubsub.getInstance();
        await pubsub.post('newGame', { game: pokerGame });
        res.json({ gameId: pokerGame.id });
    }
}
exports.openLobby = openLobby;
async function call(req, res, next) {
}
exports.call = call;
async function newPlayer(req, res, next) {
    let game = null;
    for (let i = 0; i < games.length; i++) {
        if (games[i].id === req.body.gameId) {
            game = games[i];
            games[i].addPlayer(new Player_1.Player(req.body.username));
        }
    }
    const pubsub = websocket_1.Pubsub.getInstance();
    await pubsub.post(`${req.body.gameId}/pokerLobby`, {
        username: req.body.username,
        id: req.body.gameId
    });
    res.json('success');
}
exports.newPlayer = newPlayer;
async function kickPlayer(req, res, next) {
    let game = null;
    for (let i = 0; i < games.length; i++) {
        if (games[i].id === req.body.gameId) {
            game = games[i];
        }
    }
    const pubsub = websocket_1.Pubsub.getInstance();
    await pubsub.post(`${req.body.gameId}/pokerLobbyLeave`, {
        username: req.body.username,
        id: req.body.gameId
    });
    console.log(game.stackMap);
    let keys = Array.from(game.stackMap.keys());
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].name === req.body.username) {
            console.log(keys[i]);
            game.removePlayer(keys[i]);
        }
    }
    res.json('success');
}
exports.kickPlayer = kickPlayer;
async function fetchPlayers(req, res, next) {
    let game = null;
    for (let i = 0; i < games.length; i++) {
        if (games[i].id === req.body.gameId) {
            game = games[i];
        }
    }
    let keys = Array.from(game.stackMap.keys());
    console.log(keys);
    res.json(keys);
}
exports.fetchPlayers = fetchPlayers;
async function fold(req, res, next) {
}
exports.fold = fold;
async function closeLobby(req, res, next) {
    let cancelledGame = games.filter(game => game.id !== req.body.gameId);
    games = cancelledGame;
    const pubsub = websocket_1.Pubsub.getInstance();
    await pubsub.post('endGame', { id: req.body.gameId });
    res.json('success');
}
exports.closeLobby = closeLobby;
async function fetchGames(req, res, next) {
    res.json(games);
}
exports.fetchGames = fetchGames;
