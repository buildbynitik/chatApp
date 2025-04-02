import express from "express";
import { signup, login,logout, updateProfile } from './../controllers/authController.js';
import { ProtectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/signup",signup)

router.post("/login", login)

router.post("/logout", logout)
router.put("/update-profile", ProtectRoute,updateProfile);






export default router