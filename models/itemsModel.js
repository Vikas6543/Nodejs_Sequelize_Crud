const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Item = sequelize.define(
  'Item',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startingPrice: {
      type: DataTypes.TEXT, // Specify precision and scale
      allowNull: false,
    },
    currentPrice: {
      type: DataTypes.TEXT,
      defaultValue: sequelize.literal('startingPrice'),
    },
    imageUrl: {
      type: DataTypes.TEXT,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'items',
  }
);

module.exports = Item;
