const express = require('express');
const router = express.Router();
const { addCow, getCows } = require('../controllers/cowController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addCow);
router.get('/', auth, getCows);

module.exports = router;
