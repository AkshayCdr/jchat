import { getClient, endClient } from "../postgres.js";

export async function getRoomData() {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT * FROM rooms`;
    const data = await client.query(query);
    return data.rows;
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function getRoomsByUserId(userId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `
      SELECT r.id, r.room_name
      FROM rooms r
      JOIN groups g ON r.id = g.room_id
      WHERE g.user_id = $1`;
    const values = [userId];
    const data = await client.query(query, values);
    return data.rows;
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function getRoomMembersByRoomId(roomId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `
      SELECT u.username
      FROM users u
      JOIN groups g ON u.id = g.user_id
      WHERE g.room_id = $1`;
    const values = [roomId];
    const data = await client.query(query, values);
    return data.rows;
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function addRooms(roomName) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `INSERT INTO rooms
        (room_name) VALUES($1) RETURNING id`;
    const values = [roomName];
    const result = await client.query(query, values);
    console.log("room name added");
    return result.rows[0].id;
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function addUserToRoom(userId, roomId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `INSERT INTO groups
          (user_id,room_id) VALUES($1,$2)`;
    const values = [userId, roomId];
    await client.query(query, values);
    console.log("user added to room");
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function getMessagesByRoom(roomId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `
      SELECT rc.id, u.username, rc.message, rc.timestamp 
      FROM room_chats rc
      JOIN users u ON rc.user_id = u.id
      WHERE rc.room_id = $1
      ORDER BY rc.timestamp`;
    const values = [roomId];
    const data = await client.query(query, values);
    return data.rows;
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function addMessageToRoomChat(data) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `INSERT INTO room_chats
          (user_id, room_id, message) VALUES($1, $2, $3) `;
    const values = [data.userId, data.roomId, data.message];
    const result = await client.query(query, values);
    console.log("Message inserted");
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}
