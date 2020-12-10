import express from 'express'
import {getUserById ,updateUser, authUser , getUserProfile , registerUser , updateUserProfile , getUsers , deleteUser} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router  = express.Router();

router.route('/').post(registerUser).get(protect, admin , getUsers)
router.post('/login' , authUser)

router.route('/:id').delete(protect , admin , deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect , updateUserProfile)


export default router 