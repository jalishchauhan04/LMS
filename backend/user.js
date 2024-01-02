const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("users", userSchema);
module.exports = user;
