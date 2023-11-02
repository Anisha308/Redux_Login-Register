const router = express.Router();
import express from 'express';

import { authAdmin, registerAdmin ,getAllUsers,logoutAdmin,deleteUserData,updateUserData} from '../controllers/adminController.js';
// import { adminProtect } from "../middleware/adminAuthMiddleware.js";

router.post('/auth', authAdmin)
router.post("/", registerAdmin);

router.post("/logout", logoutAdmin);
router.put("/update-user", updateUserData);
router.get("/usersList", getAllUsers);
router.post("/delete-user",deleteUserData);


export default router;