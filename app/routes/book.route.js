const express = require("express");
const router = express.Router();

//Controller
const { getBooks } = require("../controller/book.controller");

router.get("/", getBooks);
router.get("/:id", getBooks);

module.exports = router;
