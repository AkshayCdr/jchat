import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { loginHandler, logoutHandler } from "./controller/loginController.js";
import { userHandler } from "./controller/usersController.js";
import { getMessage, addMessage } from "./controller/chatController.js";

import { getUserUsingSid, getUsersUsingId } from "./model/login.js";

const app = express();

// http://localhost:5173

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

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

// app.use(
//   cors({
//     origin: "http://192.168.0.111:5173",
//     credentials: true,
//   })
// );

app.use(bodyParser.json());
app.use(cookieParser());

async function validateSession(req, res, next) {
  if (!(req.cookies && req.cookies.sessionId)) return next();
  const user = await getUserUsingSid(req.cookies.sessionId);
  console.log(user.user_id);
  req.user = user.user_id ? await getUsersUsingId(user.user_id) : null;
  console.log(req.user);
  return next();
}

// validateSession,

app.post("/login", loginHandler);
app.get("/logout", validateSession, logoutHandler);

app.get("/users", validateSession, userHandler);
app.get("/chat/:senderId/:receiverId", validateSession, getMessage);
app.post("/chat/:senderId/:receiverId", validateSession, addMessage);

app.listen(5500, () => console.log("listening to 5500"));
