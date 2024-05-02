import { v4 as uuidv4 } from "uuid";
import { getUsers, addSessionData } from "../model/login.js";
import bcrypt from "bcrypt";

export async function loginHandler(req, res) {
  if (!req.body.userName && !req.body.password) {
    res.status(404).json({ message: "invalid username or password" });
    return;
  }

  const users = await getUsers();
  const user = users.find((user) => user.username === req.body.userName);
  const passwordMatch = bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    res.status(404).json({ message: "invalid password" });
    return;
  }

  const generatedSessionId = uuidv4();
  await addSessionData({ userId: user.id, sessionId: generatedSessionId });

  res
    .cookie("sessionId", generatedSessionId, {
      secure: true,
      httpOnly: true,
      // signed: true,
      sameSite: "none",
      path: "/",
      withCredentials: true,
    })
    .send(`Authorized as user ${req.body.username}`);
}

export async function logoutHandler(req, res) {
  // Cookies that have not been signed
  console.log(req.cookies.sessionId);

  // Cookies that have been signed
  console.log(req.signedCookies);
  res.send(200);
}
