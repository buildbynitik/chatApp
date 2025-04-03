import express from 'express';
import { ProtectRoute } from '../middleware/authMiddleware.js';
import { getMessages, getUserForSidebar, sendmessage } from '../controllers/messageController.js';

const router = express.Router(); 

router.get("/users", ProtectRoute, getUserForSidebar);
router.get("/:id", ProtectRoute, getMessages);
router.post("/send/:id",ProtectRoute,sendmessage)


export default router;