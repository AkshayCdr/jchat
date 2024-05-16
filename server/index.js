import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { loginHandler, logoutHandler } from "./controller/loginController.js";
import { userHandler } from "./controller/usersController.js";
import { getMessage, addMessage } from "./controller/chatController.js";

import { getUserUsingSid, getUsersUsingId } from "./model/login.js";
import {
  getRoomById,
  getRoomMessages,
  getRooms,
  setRoom,
  setRoomMessages,
  getRoomMembers,
} from "./controller/roomController.js";

const app = express();

const whitelist = ["http://localhost:5173", "http://192.168.0.111:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  sameSite: "none",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

async function validateSession(req, res, next) {
  if (!(req.cookies && req.cookies.sessionId)) return next();
  const user = await getUserUsingSid(req.cookies.sessionId);
  if (!user) {
    req.user = null;
    return next();
  }
  req.user = user.user_id ? await getUsersUsingId(user.user_id) : null;
  return next();
}

app.post("/login", loginHandler);
app.get("/logout", validateSession, logoutHandler);

app.get("/users", validateSession, userHandler);
app.get("/chat/:senderId/:receiverId", validateSession, getMessage);
app.post("/chat/:senderId/:receiverId", validateSession, addMessage);

// app.get("/room", validateSession, getRooms);
app.get("/room/:userId", validateSession, getRoomById);
app.post("/room", validateSession, setRoom);

app.get("/room/messages/:roomId", validateSession, getRoomMessages);
app.post("/room/messages/:roomId/:userId", validateSession, setRoomMessages);

app.get("/room/messages/members/:roomId", validateSession, getRoomMembers);

app.listen(5500, () => console.log("listening to 5500"));
