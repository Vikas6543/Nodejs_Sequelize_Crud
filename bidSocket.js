const { Server } = require('socket.io');
const Item = require('./models/itemsModel');
const Bid = require('./models/bidModel');

const initSocket = (server) => {
  let io = new Server(server, {
    cors: {
      methods: ['GET', 'POST'],
    },
  });

  // socket connection
  io.on('connection', (socket) => {
    socket.on('bid', async (data) => {
      const item = await Item.findOne({ where: { id: data.itemId } });
      const bid = await Bid.create({
        item_id: data.itemId,
        user_id: data.userId,
        bid_amount: data.bidAmount,
      });
      io.emit('newBid', { bid, item });
    });
  });
};

module.exports = { initSocket };
