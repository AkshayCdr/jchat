import { getClient, endClient } from "../postgres.js";

export async function getUsers() {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT * FROM USERS`;
    const data = await client.query(query);
    return data.rows;
  } finally {
    await endClient(client);
  }
}

export async function getUsersUsingId(id) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT * FROM USERS WHERE id = $1`;
    const values = [id];
    const data = await client.query(query, values);
    return data.rows[0];
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
  } finally {
    await endClient(client);
  }
}

export async function getUserUsingSid(sessionId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT user_id FROM SESSIONS WHERE session_id = $1`;
    const values = [sessionId];
    const data = await client.query(query, values);
    return data.rows[0];
  } finally {
    await endClient(client);
  }
}

export async function deleteSession(sessionId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `DELETE FROM SESSIONS WHERE session_id = $1`;
    const values = [sessionId];
    const result = await client.query(query, values);
    console.log(
      `${result.rowCount} session(s) deleted for user with ID ${sessionId}`
    );
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
  } finally {
    await endClient(client);
  }
}
