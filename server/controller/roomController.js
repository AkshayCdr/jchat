import {
  getRoomData,
  addRooms,
  addUserToRoom,
  getMessagesByRoom,
  addMessageToRoomChat,
  getRoomsByUserId,
  getRoomMembersByRoomId,
} from "../model/rooms.js";

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

export async function getRoomById(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "User authentication failed" });
  try {
    const { userId } = req.params;
    const rooms = await getRoomsByUserId(userId);
    res.send(JSON.stringify(rooms));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function setRoom(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "User authentication failed" });
  try {
    const { roomName } = req.params;
    const { selectedUsers } = req.body;
    const roomId = await addRooms(roomName);
    await addUsersToRoom(selectedUsers, roomId);
    res.status(201).json({ message: "room added succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addUsersToRoom(users, roomId) {
  users.forEach(async (id) => {
    await addUserToRoom(id, roomId);
  });
}

export async function getRoomMessages(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "User authentication failed" });
  try {
    const { roomId } = req.params;
    const data = await getMessagesByRoom(roomId);
    res.send(JSON.stringify(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function setRoomMessages(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "User authentication failed" });
  try {
    const { roomId, userId } = req.params;
    const { message } = req.body;
    await addMessageToRoomChat({ userId, roomId, message });
    res.send("ok");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getRoomMembers(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "User authentication failed" });
  try {
    const { roomId } = req.params;
    const data = await getRoomMembersByRoomId(roomId);
    console.log(data);
    res.send(JSON.stringify(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
