const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { commonsuccess, commonerror } = require("../constant/common_response");
const { bookMessages } = require("../constant/messages");
const Book = require("../model/books.model");

exports.getBooks = async (req, res) => {
  try {
    if (req.params.id) {
      const book = await Book.findOne({ where: { id: req.params.id } });
      if (!book) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(commonerror({}, bookMessages.bookNotExist));
      }
      return res
        .status(StatusCodes.OK)
        .json(commonsuccess(book, bookMessages.bookDetail));
    }
    const books = await Book.findAll();
    return res
      .status(StatusCodes.OK)
      .json(commonsuccess(books, bookMessages.bookList));
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};
