const db = require('../config/db');

// Create user
exports.createUser = async (name, email, password) => {
  const result = await db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, password]
  );
  return result.rows[0];
};

// Get user by email
exports.getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Get user by ID
exports.getUserById = async (id) => {
  const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

// Get all users
exports.getAllUsers = async () => {
  const result = await db.query('SELECT id, name, email FROM users');
  return result.rows;
};

// Update user
exports.updateUser = async (id, name, email, password) => {
  const result = await db.query(
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email',
    [name, email, password, id]
  );
  return result.rows[0];
};

// Delete user
exports.deleteUser = async (id) => {
  const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id, name, email', [id]);
  return result.rows[0];
};
