import express from "express";
import { signup, login,logout, updateProfile, checkAuth } from './../controllers/authController.js';
import { ProtectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/signup",signup)

router.post("/login", login)

router.post("/logout", logout)
router.put("/update-profile", ProtectRoute, updateProfile);

router.get("/checkAuth", ProtectRoute,checkAuth);






export default router