import { Router } from 'express'
import usersRouter from './users'
import pokerGameRouter from './pokerGames'

const router = Router()
router.use('/api', usersRouter)
router.use('/api', pokerGameRouter)


export default router