import { getUserUsingId } from "../model/socket.js";

import { getRoomsByUserId } from "../model/rooms.js";

export async function getUserNamesUsingId(data) {
  let users = [];
  for (let userId of data) {
    const username = await getUserUsingId(userId);
    users.push(username);
  }
  return users;
}

export async function getRooms(userId) {
  return getRoomsByUserId(userId);
}
