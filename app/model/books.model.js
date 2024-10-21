// models/books.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  publishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = Book;
