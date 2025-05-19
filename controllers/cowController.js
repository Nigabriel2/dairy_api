const { insertCow, fetchCows } = require('../models/cowModel');

exports.addCow = async (req, res) => {
  const { tag_number, name, breed, date_of_birth, purchase_date } = req.body;
  try {
    const cow = await insertCow(tag_number, name, breed, date_of_birth, purchase_date, req.user.id);
    res.status(201).json(cow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCows = async (req, res) => {
  try {
    const cows = await fetchCows(req.user.id);
    res.json(cows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
