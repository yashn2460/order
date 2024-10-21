// models/cart.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Cart = sequelize.define("Cart", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  addedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // name of the Users table
      key: "id",
    },
  },
});

module.exports = Cart;
