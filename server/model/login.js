import { getClient, endClient } from "../postgres.js";

export async function getUsers() {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT * FROM USERS`;
    const data = await client.query(query);
    return data.rows;
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function addSessionData(data) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `INSERT INTO SESSIONS
        (session_id,user_id) VALUES($1,$2)`;
    const values = [data.sessionId, data.userId];
    await client.query(query, values);
    console.log("session data added");
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function getSession() {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT * FROM SESSIONS`;
    const data = await client.query(query);
    return data.rows;
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}

export async function deleteSessionId(id) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `DELETE FROM SESSIONS WHERE id = $1`;
    const values = [id];
    const result = await client.query(query, values);
    console.log(`${result.rowCount} session(s) deleted for user with ID ${id}`);
  } catch (err) {
    console.error(err.message);
  } finally {
    await endClient(client);
  }
}
