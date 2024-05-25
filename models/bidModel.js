const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./usersModel');
const Item = require('./itemsModel');

const Bid = sequelize.define(
  'Bid',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
        key: 'id',
      },
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    bid_amount: {
      type: DataTypes.DECIMAL(10, 2), // Specify precision and scale
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'bids',
  }
);

// Associations
Bid.belongsTo(Item, { foreignKey: 'item_id' });
Bid.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Bid;
