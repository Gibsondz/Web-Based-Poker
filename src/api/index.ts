import { Router } from 'express'
import usersRouter from './users'

const router = Router()
router.use('/api', usersRouter)


export default router