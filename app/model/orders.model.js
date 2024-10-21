// models/orders.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Order = sequelize.define("Order", {
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
    defaultValue: "pending",
  },
  orderDate: {
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

module.exports = Order;
