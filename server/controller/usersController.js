import { getUsers } from "../model/login.js";

// export async function userHandler(req, res) {
//   const users = await getUsers();
//   res.send(JSON.stringify(users));
// }

export const userHandler = async (req, res) => {
  // if (req.user) {
  return res.send(JSON.stringify(await getUsers()));
  // }
  // res.status(401).json({ message: "user authentication failed" });
};
