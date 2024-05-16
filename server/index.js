import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { corsOptions } from "./cors.options.js";

import userRouter from "./router/user.router.js";
import roomRouter from "./router/room.router.js";
import chatRouter from "./router/chat.router.js";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/rooms", roomRouter);

app.listen(5500, () => console.log("listening to 5500"));
