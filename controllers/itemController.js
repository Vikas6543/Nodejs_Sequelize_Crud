const Item = require('../models/itemsModel');
const multer = require('../middleware/multerConfig');

exports.getItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const items = await Item.findAndCountAll({ limit, offset });
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
};

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
  if (item.user_id !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Unauthorized' });

  const { name, description, starting_price, end_time } = req.body;
  try {
    await item.update({ name, description, starting_price, end_time });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  if (item.user_id !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Unauthorized' });

  try {
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
