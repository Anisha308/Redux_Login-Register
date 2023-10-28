import express from 'express';
import { authUser,logoutUser,getUserProfile,updateUserProfile,registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/',authUser)
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile)








export default router;