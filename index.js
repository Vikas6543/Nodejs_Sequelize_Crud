const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/usersModel');
const Item = require('./models/itemsModel');
const Bid = require('./models/bidModel');
const Notification = require('./models/notificationsModel');
const { createServer } = require('http');
const server = createServer(app);

// dot env config
dotenv.config();

// middlewares
app.use(express.json());
app.use(cors());

// database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// sync database models and create tables
User.sync();
Item.sync();
Notification.sync();
Bid.sync();

// routes
app.use('/auth', require('./routes/authRoute'));
app.use('/items', require('./routes/itemRoute'));
app.use('/bid', require('./routes/bidRoute'));
app.use('/notification', require('./routes/notificationRoute'));

// socket io
const { initSocket } = require('./bidSocket');
initSocket(server);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
