const Item = require('../models/itemsModel');
const multer = require('../middleware/multerConfig');

// get all items - pagination
exports.getItems = async (req, res) => {
  const { page = 1, limit = 5 } = req.body;
  const offset = (page - 1) * limit;

  try {
    const items = await Item.findAndCountAll({ limit, offset });

    res.status(200).json({
      message: 'Items fetched successfully',
      totalCounts: items.count,
      items: items.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// get item by id
exports.getItemById = async (req, res) => {
  const item = await Item.findByPk(req.params.id);

  try {
    if (!item) return res.status(404).json({ error: 'Item not found' });

    res.status(200).json({
      message: 'Item fetched successfully',
      item: item,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new item
exports.createItem = [
  multer.single('image'),
  async (req, res) => {
    const { name, description, startingPrice, currentPrice, endTime } =
      req.body;
    const imageUrl = req.file && req.file.path;
    try {
      const item = await Item.create({
        name,
        description,
        startingPrice,
        imageUrl,
        currentPrice: currentPrice || startingPrice,
        endTime,
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

exports.updateItem = async (req, res) => {
  const item = await Item.findByPk(req.params.id);

  if (!item) return res.status(404).json({ error: 'Item not found' });

  if (req?.user?.role !== 'admin')
    return res.status(403).json({ error: 'Unauthorized to update item...' });

  const { name, description, startingPrice, endTime } = req.body;
  try {
    await item.update({ name, description, startingPrice, endTime });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Unauthorized to delete item...' });

  try {
    await item.destroy();
    res.status(200).json({
      message: 'Item deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
