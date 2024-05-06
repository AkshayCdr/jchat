import { getChatMessagesBetweenUsers } from "../model/chat.js";

export async function getMessage(req, res) {
  const { senderId, receiverId } = req.params;
  const chats = await getChatMessagesBetweenUsers(senderId, receiverId);
  console.log(chats);
  res.send(JSON.stringify(chats));
}
