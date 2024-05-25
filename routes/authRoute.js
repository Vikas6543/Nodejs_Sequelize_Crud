const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// register route
router.post('/register', register);

// login route
router.post('/login', login);

// profile route
router.get('/profile', authMiddleware, profile);

module.exports = router;
