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
