import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loginHandler, logoutHandler } from "./controller/loginController.js";
import bodyParser from "body-parser";

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
app.post("/logout", logoutHandler);
// app.get("/users", getUsers);

app.listen(5500, () => console.log("listening to 5500"));
