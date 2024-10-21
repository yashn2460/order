// database.js
const { Sequelize } = require("sequelize");

// Create a Sequelize instance (replace with your database credentials)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost", // or your DB host
    dialect: "mysql", // because we're using MySQL
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Run the connection test
testConnection();

module.exports = sequelize;
