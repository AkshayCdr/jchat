import pg from "pg";
const { Client } = pg;

export async function getClient() {
  return new Client({
    host: "localhost",
    port: 5432,
    database: "jchat",
    user: "postgres",
    password: "admin@123",
  });
}

export async function endClient(client) {
  client.end();
  console.log("connection ended");
}
