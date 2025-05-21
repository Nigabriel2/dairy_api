const { insertCow, fetchCows, updateCow } = require('../models/cowModel');

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

exports.editCow = async (req, res) => {
  const { tag_number, name, breed, date_of_birth, purchase_date } = req.body;
  const cowId = req.params.id;

  try {
    const cow = await updateCow(cowId, tag_number, name, breed, date_of_birth, purchase_date, req.user.id);
    if (!cow) {
      return res.status(404).json({ error: 'Cow not found or not owned by user' });
    }
    res.json(cow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
