import {
  getChatMessagesBetweenUsers,
  addChatMessage,
  getChatMessagesWithUsernames,
} from "../model/chat.js";

export async function getMessage(req, res) {
  if (req.user) {
    const { senderId, receiverId } = req.params;
    // const chats = await getChatMessagesBetweenUsers(senderId, receiverId);
    const chats = await getChatMessagesWithUsernames(senderId, receiverId);
    console.log(chats);
    return res.send(JSON.stringify(chats));
  }
  return res.status(401).json({ message: "user authentication failed" });
}

export async function addMessage(req, res) {
  if (req.user) {
    console.log("inside add MEssage");
    console.log(req.body);

    const { message } = req.body;
    const { senderId, receiverId } = req.params;
    console.log(senderId);
    console.log(receiverId);
    await addChatMessage(senderId, receiverId, message);
    return res.send("message added succesfully");
  }
  return res.status(401).json({ message: "user authentication failed" });
}
