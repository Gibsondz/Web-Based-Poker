import { Router } from 'express'
import { login, signUp, getUser, updateUser, getAllUsers,makeAdmin, makeStandard, deleteUser} from '../controllers/users'
const router = Router({ mergeParams: true })
router.post('/users/Login', login)
router.post('/users/newUser', signUp)
router.post('/users/getUser', getUser)
router.post('/users/getAllUser', getAllUsers)
router.post('/users/updateUser', updateUser)
router.post('/users/makeAdmin', makeAdmin)
router.post('/users/makeStandard', makeStandard)
router.post('/users/deleteUser', deleteUser)
export default router