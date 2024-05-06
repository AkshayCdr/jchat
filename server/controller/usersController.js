import { getUsers } from "../model/login.js";

// export async function userHandler(req, res) {
//   const users = await getUsers();
//   res.send(JSON.stringify(users));
// }

export const userHandler = async (req, res) =>
  res.send(JSON.stringify(await getUsers()));
