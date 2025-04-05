import express from 'express';
import { ProtectRoute } from '../middleware/authMiddleware.js';
import { getMessages, getUserForSidebar, sendmessage } from '../controllers/messageController.js';

const router = express.Router(); 

router.get("/users", ProtectRoute, getUserForSidebar);   // ✅ More specific route first
router.get("/:id", ProtectRoute, getMessages);           // ✅ Less specific route second
router.post("/send/:id", ProtectRoute, sendmessage);     // ✅ OK



export default router;