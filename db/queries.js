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
  return result.rowCount;
}

async function selectAllMsgAndUser() {
  const { rows } = await pool.query(`
    SELECT messages.id AS messageid, title, message, added, username, useremail, admin, member
    FROM messages JOIN users ON users.id = userid
    `);
  return rows;
}
// result eg:  {
//     messageid: 1,
//     title: 'abc',
//     message: 'i love u',
//     added: 2026-10-15T17:00:00.000Z,
//     username: 'abc',
//     useremail: 'abc@gmail.com',
//     admin: 0,
//     member: 0
//   },

async function updateMemberShip(id) {
  const result = await pool.query(
    `
    UPDATE users
    SET member = 1
    WHERE id = $1
    `,
    [id],
  );
  return result.rowCount;
}
// result of update is result.rowCount: != 0

async function updateCancelMemberShip(id) {
  const result = await pool.query(
    `
    UPDATE users
    SET member = 0
    WHERE id = $1

    `,
    [id],
  );
  return result.rowCount;
}

async function updateAdmin(id) {
  const { rowCount } = await pool.query(
    `
    UPDATE users
    SET admin = 1
    WHERE id = $1
    `,
    [id],
  );
  return rowCount;
}

async function updateCancelAdmin(id) {
  const { rowCount } = await pool.query(
    `
    UPDATE users
    SET admin = 0
    WHERE id = $1
    `,
    [id],
  );
  return rowCount;
}

async function deleteMsgById(id) {
  const { rowCount } = await pool.query(
    `
    DELETE FROM messages WHERE id = $1
    `,
    [id],
  );
  return rowCount;
}

module.exports = {
  insertUser,
  selectUsers,
  selectUserByName,
  selectUserById,
  insertMessage,
  selectAllMsgAndUser,
  updateMemberShip,
  updateCancelMemberShip,
  updateAdmin,
  updateCancelAdmin,
  deleteMsgById,
};
