// models/orderItems.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Order = require("./orders.model");

const OrderItems = sequelize.define("OrderItems", {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Orders",
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Books",
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceAtPurchase: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Associations
Order.hasMany(OrderItems, { foreignKey: "orderId", as: "orderItems" });
OrderItems.belongsTo(Order, { foreignKey: "orderId" });

module.exports = OrderItems;
