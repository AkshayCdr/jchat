import { getClient, endClient } from "../postgres.js";

export async function getUserUsingId(userId) {
  const client = await getClient();
  try {
    await client.connect();
    const query = `SELECT username FROM USERS WHERE id = $1`;
    const values = [userId];
    const data = await client.query(query, values);
    return data.rows[0];
  } finally {
    await endClient(client);
  }
}
