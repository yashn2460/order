const { StatusCodes, ReasonPhrases } = require("http-status-codes"); // For status codes
const { commonsuccess, commonerror } = require("../constant/common_response");  // For Common responses
const { bookMessages } = require("../constant/messages"); // For dynamic message

//Models
const Book = require("../model/books.model"); 

exports.getBooks = async (req, res) => {
  try {
    // by id book details
    if (req.params.id) {
      const book = await Book.findOne({ where: { id: req.params.id } });
      if (!book) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            commonerror({}, bookMessages.bookNotExist, StatusCodes.NOT_FOUND)
          );
      }
      return res
        .status(StatusCodes.OK)
        .json(commonsuccess(book, bookMessages.bookDetail));
    }

    // Listing
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
