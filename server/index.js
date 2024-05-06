import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { loginHandler, logoutHandler } from "./controller/loginController.js";
import { userHandler } from "./controller/usersController.js";
import { getMessage, addMessage } from "./controller/chatController.js";

import { getUserUsingSid, getUsersUsingId } from "./model/login.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   if (req.cookies.sessionId) {
//     const userId = getUserUsingSid(req.cookies.sessionId);
//     req.user = userId ? getUsersUsingId(userId) : null;
//     next();
//   }
//   res.status(401).json({ message: "no session id " });
// });

// async function validateSession(req, res, next) {
//   if (req.cookies.sessionId) {
//     const userId = await getUserUsingSid(req.cookies.sessionId);

//     req.user = userId ? await getUsersUsingId(userId[0].user_id) : null;
//     console.log(req.user);
//     next();
//   }
//   return res.status(401).json({ message: "no session id " });
// }

app.post("/login", loginHandler);
app.get("/logout", logoutHandler);
app.get("/users", userHandler);
app.get("/chat/:senderId/:receiverId", getMessage);
app.post("/chat/:senderId/:receiverId", addMessage);
//  /chat/user:id/second-user:id

// app.get("/users", getUsers);

app.listen(5500, () => console.log("listening to 5500"));
