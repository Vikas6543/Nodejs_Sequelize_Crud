const Bid = require('../models/bidModel');
const Item = require('../models/itemsModel');

exports.getBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
    res.json(bids);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createBid = async (req, res) => {
  const { bidAmount } = req.body;
  const item = await Item.findByPk(req.params.itemId);

  if (!item) return res.status(404).json({ error: 'Item not found' });

  if (new Date() > new Date(item.endTime))
    return res.status(400).json({ error: 'Auction ended' });

  if (bidAmount <= item.currentPrice)
    return res
      .status(400)
      .json({ error: 'Bid amount must be higher than current price' });

  try {
    const bid = await Bid.create({
      item_id: req.params.itemId,
      user_id: req.user.id,
      bid_amount: bidAmount,
    });
    await item.update({ currentPrice: bidAmount });
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
