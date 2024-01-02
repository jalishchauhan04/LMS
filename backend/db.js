const mongoose = require("mongoose");
const url = "";

try {
  const db = mongoose.connect(url);
} catch (err) {
  console.log(err.message);
}
