const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transcationSchema = new Schema({
  transcationID: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  transcationType: {
    type: String,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("transaction", transcationSchema);
module.exports = Transaction;
