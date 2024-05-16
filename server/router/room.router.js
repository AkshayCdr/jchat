import express from "express";
import { validateSession } from "../user.auth.js";
import {
  getRoomById,
  getRoomMembers,
  getRoomMessages,
  setRoom,
  setRoomMessages,
} from "../controller/roomController.js";

const router = express.Router();

router.get("/:userId", validateSession, getRoomById);
router.post("/:roomName", validateSession, setRoom);
router.get("/messages/:roomId", validateSession, getRoomMessages);
router.post("/messages/:roomId/:userId", validateSession, setRoomMessages);
router.get("/messages/members/:roomId", validateSession, getRoomMembers);

export default router;
