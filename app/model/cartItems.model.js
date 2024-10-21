// models/cartItems.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Cart = require("./cart.model");
const Book = require("./books.model");
const CartItems = sequelize.define("CartItems", {
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Carts", // The table name
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Books", // The table name
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Associations
Cart.hasMany(CartItems, { foreignKey: "cartId", as: "cartItems" });
CartItems.belongsTo(Cart, { foreignKey: "cartId" });

// Book.belongsTo(CartItems, { foreignKey: "bookId" });
CartItems.belongsTo(Book, { foreignKey: "bookId", as: "book" });

module.exports = CartItems;
