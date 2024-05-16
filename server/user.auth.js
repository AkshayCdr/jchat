import { getUserUsingSid, getUsersUsingId } from "./model/login.js";

export async function validateSession(req, res, next) {
  if (!(req.cookies && req.cookies.sessionId)) return next();
  const user = await getUserUsingSid(req.cookies.sessionId);
  if (!user) {
    req.user = null;
    return next();
  }
  req.user = user.user_id ? await getUsersUsingId(user.user_id) : null;
  return next();
}
