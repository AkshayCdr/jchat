import { v4 as uuidv4 } from "uuid";
import {
  getUsers,
  addSessionData,
  deleteSessionUsingUserId,
} from "../model/login.js";
import bcrypt from "bcrypt";

export async function loginHandler(req, res) {
  try {
    console.log("inside login handler");
    if (!req.body.userName && !req.body.password) {
      res.status(404).json({ message: "invalid username or password" });
      return;
    }

    const users = await getUsers();
    const user = users.find((user) => user.username === req.body.userName);

    if (!user) {
      res.status(401).json({ message: "username doesn't exist" });
      return;
    }

    const passwordMatch = bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "invalid password" });
      return;
    }

    const generatedSessionId = uuidv4();
    await addSessionData({ userId: user.id, sessionId: generatedSessionId });

    res
      .cookie("sessionId", generatedSessionId, {
        same_site: "none",
      })
      .send(`Authorized as user ${req.body.username}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function logoutHandler(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "Authentication error" });
  try {
    await deleteSessionUsingUserId(req.user.id);
    return res.clearCookie("sessionId").send("cookie cleared");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
