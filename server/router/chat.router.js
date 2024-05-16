import express from "express";
import { validateSession } from "../user.auth.js";
import { addMessage, getMessage } from "../controller/chatController.js";

const router = express.Router();

router.get("/:senderId/:receiverId", validateSession, getMessage);
router.post("/:senderId/:receiverId", validateSession, addMessage);

export default router;
