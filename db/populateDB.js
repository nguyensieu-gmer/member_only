const { Client } = require("pg");

const USER_SQL = `
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50),
    useremail VARCHAR(255),
    userpassword VARCHAR(255),
    admin INTEGER,
    member INTEGER
)
`;

const MESSAGE_SQL = `
CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    message TEXT,
    added DATE,
    userid INTEGER
)
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(USER_SQL);
  await client.query(MESSAGE_SQL);
  await client.end();
  console.log("end...");
}

main();
