const express = require('express');
const { getBids, createBid } = require('../controllers/bidController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:itemId', getBids);
router.post('/:itemId', authenticateToken, createBid);

module.exports = router;
