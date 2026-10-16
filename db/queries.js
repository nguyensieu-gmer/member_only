const pool = require("./pool");

async function insertUser(username, useremail, password) {
  await pool.query(
    `
        INSERT INTO users(username, useremail, userpassword, admin, member) 
        VALUES ($1, $2, $3, 0, 0)
        `,
    [username, useremail, password],
  );
}

async function selectUsers() {
  const { rows } = await pool.query(`
        SELECT username, useremail 
        FROM users
        `);
  return rows;
}
// eg: rows = [ { username: 'abc', useremail: 'abc@gmail.com' } ]

async function selectUserByName(username) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users WHERE username = $1
      `,
    [username],
  );
  return rows[0];
}
// eg: { id: 1, username: 'abc', useremail: 'abc@gmail.com', userpassword: 'abc', admin: 0, member: 0

async function selectUserById(id) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users WHERE id = $1
      `,
    [id],
  );
  return rows[0];
}
// eg: { id: 1, username: 'abc', useremail: 'abc@gmail.com', userpassword: 'abc', admin: 0, member: 0
async function insertMessage(title, text, date, userId) {
  const result = await pool.query(
    `
      INSERT INTO messages(title, message, added, userid) 
      VALUES ($1, $2, $3, $4)
    `,
    [title, text, date, userId],
  );
  return result;
}

async function selectAllMsg() {
  const { rows } = await pool.query(`
    SELECT * FROM messages
    `);
  return rows;
}
// eg: [{id: 1,title: 'abc',message: 'abc',added: 2026-10-15T17:00:00.000Z,userid: 1},]

module.exports = {
  insertUser,
  selectUsers,
  selectUserByName,
  selectUserById,
  insertMessage,
  selectAllMsg,
};
