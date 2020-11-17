import { Router } from 'express'
import { login, signUp, getUser, updateUser} from '../controllers/users'
const router = Router({ mergeParams: true })
router.post('/users/Login', login)
router.post('/users/newUser', signUp)
router.post('/users/getUser', getUser)
router.post('/users/updateUser', updateUser)
export default router