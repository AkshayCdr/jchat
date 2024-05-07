import {
  getChatMessagesBetweenUsers,
  addChatMessage,
  getChatMessagesWithUsernames,
} from "../model/chat.js";

export async function getMessage(req, res) {
  const { senderId, receiverId } = req.params;
  // const chats = await getChatMessagesBetweenUsers(senderId, receiverId);
  const chats = await getChatMessagesWithUsernames(senderId, receiverId);
  console.log(chats);
  res.send(JSON.stringify(chats));
}

export async function addMessage(req, res) {
  console.log("inside add MEssage");
  console.log(req.body);

  const { message } = req.body;
  const { senderId, receiverId } = req.params;
  console.log(senderId);
  console.log(receiverId);
  await addChatMessage(senderId, receiverId, message);
  res.send("message added succesfully");
}
