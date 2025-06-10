const express = require('express');
const router = express.Router();
const { addCow, getCows, editCow, deleteCow } = require('../controllers/cowController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addCow);
router.get('/', auth, getCows);
router.put('/:id', auth, editCow);
router.delete('/:id', auth, deleteCow); // 🆕 DELETE cow route

module.exports = router;
