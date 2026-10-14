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

module.exports = { insertUser, selectUsers };
