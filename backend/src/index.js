const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../db");
const Book = require("../Books");
const Transaction = require("../Transcation");
const bcrypt = require("bcrypt");
const User = require("../user");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.json());

app.post("/getBooks", async (req, res) => {
  try {
    const data = await Book.find({});
    if (data) {
      return res.status(200).send({ status: 200, Data: data });
    } else {
      return res
        .status(500)
        .send({ status: 500, message: "Internal Server Error" });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ userName: username });
    if (!user) {
      console.log("user");
      return res
        .status(400)
        .send({ status: 400, message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    console.log(isPasswordValid);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          username: username,
          grantType: "userLogin",
          successType: "online",
        },
        "6592675edd50288a72aa8549"
      );
      return res
        .status(200)
        .send({ status: 200, message: "successfully login", token: token });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Invalid username or password" });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, name, phone, password } = req.body;
  if (!username || !name || !phone || !password) {
    return res
      .status(400)
      .send({ status: 400, message: "Please enter required fields" });
  }

  try {
    const userInfo = await User.findOne({ username: username });
    if (!userInfo) {
      const userData = new User({
        userID: uuid(),
        userName: username,
        phone: phone,
        password: await bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });

      await userData.save();
      return res
        .status(200)
        .send({ status: 200, message: "Successfully saved data" });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "This user already exists" });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

app.post("/transaction", async (req, res) => {
  try {
    const { username, name, phone, transactionType, returnDate, bookName } =
      req.body;
    if (
      !username ||
      !name ||
      !phone ||
      !transactionType ||
      !returnDate ||
      !bookName
    ) {
      return res
        .status(400)
        .send({ status: 400, message: "Please enter required fields" });
    }

    const transactionData = new Transaction({
      transactionID: uuid(),
      personName: username,
      contactNo: phone,
      bookName: bookName,
      transactionType: transactionType,
      returnDate: returnDate,
    });

    await transactionData.save();
    return res
      .status(200)
      .send({ status: 200, message: "Successfully saved data" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
