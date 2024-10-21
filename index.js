require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

//Database
const sequelize = require("./config/db");
sequelize.sync({ force: false }).then(() => console.log("database synced"));

//server middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  return res.send("Ace analytics project");
});

const AuthRoute = require("./app/routes/auth.route"); //Auth routes
const BookRoute = require("./app/routes/book.route"); //Book routes
const CartRoute = require("./app/routes/cart.route"); //Cart routes
const OrderRoute = require("./app/routes/order.route"); //order routes

app.use("/auth", AuthRoute);
app.use("/book", BookRoute);
app.use("/cart", CartRoute);
app.use("/order", OrderRoute);

app.listen(port, () => console.log(`Listening to server ${port}`));
