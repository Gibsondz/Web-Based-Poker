import { Router } from 'express'
import { login, signUp} from '../controllers/users'
const router = Router({ mergeParams: true })
router.post('/users/Login', login)
router.post('/users/newUser', signUp)
export default router