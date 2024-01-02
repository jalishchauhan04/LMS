const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  bookID: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  bookImage: {
    type: String,
    required: true,
  },
  bookPrice: {
    type: String,
    required: true,
  },
  bookDesc: {
    type: String,
    required: true,
  },
});

const books = mongoose.model("Books", bookSchema);
module.exports = books;
