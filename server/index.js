import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { loginHandler, logoutHandler } from "./controller/loginController.js";
import { userHandler } from "./controller/usersController.js";
import { getMessage } from "./controller/chatController.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

app.post("/login", loginHandler);
app.get("/logout", logoutHandler);
app.get("/users", userHandler);
app.get("/chat/:senderId/:receiverId", getMessage);
// app.post('/chat')
//  /chat/user:id/second-user:id

// app.get("/users", getUsers);

app.listen(5500, () => console.log("listening to 5500"));
