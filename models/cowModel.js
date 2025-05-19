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
