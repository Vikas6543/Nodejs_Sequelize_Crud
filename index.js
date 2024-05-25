const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./database');
const User = require('./models/usersModel');
const Item = require('./models/itemsModel');
const Bid = require('./models/bidModel');
const Notification = require('./models/notificationsModel');

// dot env config
dotenv.config();

// middlewares
app.use(express.json());

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
