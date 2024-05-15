import { getRoomData, addRooms, addUserToRoom } from "../model/rooms.js";

export async function getRooms(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "User authentication failed" });
  try {
    const rooms = await getRoomData();
    res.send(JSON.stringify(rooms));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function setRoom(req, res) {
  const { roomName, selectedUsers } = req.body;
  try {
    const roomId = await addRooms(roomName);
    console.log(roomId);
    await addUsersToRoom(selectedUsers, roomId);
    res.status(201).json({ message: "room added succesfully" });
  } catch {
    res.status(500).json({ message: error.message });
  }
}

async function addUsersToRoom(users, roomId) {
  users.forEach(async (id) => {
    await addUserToRoom(id, roomId);
  });
}
