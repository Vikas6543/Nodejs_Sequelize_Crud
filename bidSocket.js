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
    console.log('Socket Connected...');
  });
};

module.exports = { initSocket };
