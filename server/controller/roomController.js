import { getRoomData } from "../model/rooms.js";

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
