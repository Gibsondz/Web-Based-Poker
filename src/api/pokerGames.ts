import { Router } from 'express'
import { call, newPlayer, kickPlayer, fold, openLobby, closeLobby, fetchGames, fetchPlayers, start, getRendering, bet, check} from '../controllers/pokerGame'
const router = Router({ mergeParams: true })
router.post('/game/call', call)
router.post('/game/openLobby', openLobby)
router.post('/game/newPlayer', newPlayer)
router.post('/game/kickPlayer', kickPlayer)
router.post('/game/fetchPlayers', fetchPlayers)
router.post('/game/fold', fold)
router.post('/game/bet', bet)
router.post('/game/check', check)
router.post('/game/closeLobby', closeLobby)
router.post('/game/fetchGames', fetchGames)
router.post('/game/start', start);
router.post('/game/getRendering', getRendering)
export default router