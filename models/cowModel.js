const db = require('../config/db');

exports.insertCow = async (tag, name, breed, dob, purchase, userId) => {
  const result = await db.query(
    `INSERT INTO cows (tag_number, name, breed, date_of_birth, purchase_date, user_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [tag, name, breed, dob, purchase, userId]
  );
  return result.rows[0];
};

exports.fetchCows = async (userId) => {
  const result = await db.query(
    'SELECT * FROM cows WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

exports.updateCow = async (id, tag, name, breed, dob, purchase, userId) => {
  const result = await db.query(
    `UPDATE cows
     SET tag_number = $1, name = $2, breed = $3, date_of_birth = $4, purchase_date = $5
     WHERE id = $6 AND user_id = $7
     RETURNING *`,
    [tag, name, breed, dob, purchase, id, userId]
  );
  return result.rows[0];
};

exports.deleteCow = async (id, userId) => {
  const result = await db.query(
    `DELETE FROM cows
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );
  return result.rows[0];
};
