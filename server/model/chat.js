import { getClient, endClient } from "../postgres.js";

export async function getChatMessagesBetweenUsers(user1_id, user2_id) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT * FROM CHATS WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)`;
    const values = [user1_id, user2_id];
    const data = await client.query(query, values);
    return data.rows;
  } catch (error) {
    console.error("Error fetching chat messages:", error.message);
  } finally {
    await endClient(client);
  }
}

export async function addChatMessage(sender_id, receiver_id, message) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `INSERT INTO CHATS (sender_id, receiver_id, message) VALUES ($1, $2, $3)`;
    const values = [sender_id, receiver_id, message];
    await client.query(query, values);
    console.log("Chat message added successfully");
  } catch (error) {
    console.error("Error adding chat message:", error.message);
  } finally {
    await endClient(client);
  }
}

export async function getChatMessagesWithUsernames(senderId, receiverId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `
        SELECT
          c.id AS chat_id,
          s.username AS sender_username,
          r.username AS receiver_username,
          c.message,
          c.timestamp
        FROM
          CHATS c
        INNER JOIN
          USERS s ON c.sender_id = s.id
        INNER JOIN
          USERS r ON c.receiver_id = r.id
          WHERE (c.sender_id = $1 AND c.receiver_id = $2) OR (c.sender_id = $2 AND c.receiver_id = $1)`;
    const values = [senderId, receiverId];
    const data = await client.query(query, values);
    return data.rows;
  } catch (error) {
    console.error(
      "Error fetching chat messages with usernames:",
      error.message
    );
  } finally {
    await endClient(client);
  }
}
