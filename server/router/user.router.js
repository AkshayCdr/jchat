import express from "express";
import { loginHandler, logoutHandler } from "../controller/loginController.js";
import { validateSession } from "../user.auth.js";
import { userHandler } from "../controller/usersController.js";

const router = express.Router();

router.get("/", validateSession, userHandler);
router.post("/login", loginHandler);
router.get("/logout", validateSession, logoutHandler);

export default router;
