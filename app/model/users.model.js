// models/users.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Order = require("./orders.model"); // Import the Order model
const Cart = require("./cart.model"); // Import the Cart model

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations
User.hasMany(Order, { foreignKey: "userId" }); // User can have many orders
User.hasMany(Cart, { foreignKey: "userId" }); // User can have many cart items

Order.belongsTo(User, { foreignKey: "userId" }); // Order belongs to User
Cart.belongsTo(User, { foreignKey: "userId" }); // Cart belongs to User

module.exports = User;
