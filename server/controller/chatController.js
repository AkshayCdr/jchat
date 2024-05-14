import {
  getChatMessagesBetweenUsers,
  addChatMessage,
  getChatMessagesWithUsernames,
} from "../model/chat.js";

export async function getMessage(req, res) {
  if (req.user) {
    const { senderId, receiverId } = req.params;
    isValidId(senderId, receiverId);
    const chats = await getChatMessagesWithUsernames(senderId, receiverId);
    return res.send(JSON.stringify(chats));
  }
  return res.status(401).json({ message: "user authentication failed" });
}

export async function addMessage(req, res) {
  if (req.user) {
    const { message } = req.body;
    const { senderId, receiverId } = req.params;
    await addChatMessage(senderId, receiverId, message);
    return res.send("message added succesfully");
  }
  return res.status(401).json({ message: "user authentication failed" });
}

function isValidId(id) {
  console.log(id);
  console.log(typeof id);
  console.log(isNaN());
  // return typeof id === "string" && id.trim().length > 0;
}
