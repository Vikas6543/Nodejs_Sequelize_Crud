const express = require('express');
const {
  getItems,
  getItemById,
  createItem,
  searchItems,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/createItem', authenticateToken, createItem);
router.post('/search', authenticateToken, searchItems);
router.put('/updateItem/:id', authenticateToken, updateItem);
router.delete('/:id', authenticateToken, deleteItem);

module.exports = router;
