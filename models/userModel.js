const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

exports.getUserById = async (id) => {
  const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

exports.createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

exports.getAllUsers = async () => {
  const result = await db.query('SELECT id, name, email FROM users');
  return result.rows;
};

exports.updateUser = async (id, name, email) => {
  const result = await db.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
    [name, email, id]
  );
  return result.rows[0];
};

exports.deleteUser = async (id) => {
  await db.query('DELETE FROM users WHERE id = $1', [id]);
};
