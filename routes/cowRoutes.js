const express = require('express');
const router = express.Router();
const { addCow, getCows, editCow } = require('../controllers/cowController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addCow);
router.get('/', auth, getCows);
router.put('/:id', auth, editCow); // 🆕 PUT method for editing cow

module.exports = router;
