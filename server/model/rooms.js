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
