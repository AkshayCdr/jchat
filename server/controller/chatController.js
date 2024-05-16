import {
  getChatMessagesBetweenUsers,
  addChatMessage,
  getChatMessagesWithUsernames,
} from "../model/chat.js";

import { isValidId, isValidMessage } from "../validation.js";

export async function getMessage(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "user authentication failed" });

  try {
    const { senderId, receiverId } = req.params;

    if (!isValidId(senderId, receiverId))
      return res.status(400).json({ message: "invalid params" });

    const chats = await getChatMessagesWithUsernames(senderId, receiverId);
    return res.send(JSON.stringify(chats));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addMessage(req, res) {
  if (!req.user)
    return res.status(401).json({ message: "user authentication failed" });

  try {
    const { message } = req.body;

    // if (isValidMessage)
    //   return res.status(400).json({ message: "invalid message" });

    const { senderId, receiverId } = req.params;

    if (!isValidId(senderId, receiverId))
      return res.status(400).json({ message: "invalid params" });

    await addChatMessage(senderId, receiverId, message);
    return res.send("message added succesfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
