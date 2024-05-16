import { getUsers } from "../model/login.js";

export const userHandler = async (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(await getUsers()));
  }
  return res.status(401).json({ message: "user authentication failed" });
};
