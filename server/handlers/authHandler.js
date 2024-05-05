const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const { comparePassword, hashPassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { MONGO_URI } = process.env;

const test = (req, res) => {
  res.status(200).json("Login test success");
};

// Register Endpoint
const registerUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  await client.connect();
  try {
    const db = client.db("Data");
    const { name, email, password } = req.body;

    // Check password
    if (password.length < 6) {
      return res.json({
        error: "Password should be at least 6 characters long",
      });
    }

    // Check email
    const exist = await db.collection("Users").findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    // Create user
    const _id = uuidv4();
    const user = await db
      .collection("Users")
      .insertOne({ _id, name, email, password: hashedPassword });

    return res.json(user);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

// Login Endpoint

const loginUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  try {
    const db = client.db("Data");

    const { email, password } = req.body;

    // Check if user exists
    const user = await db.collection("Users").findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    // Check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }

    if (!match) {
      res.json({
        error: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = { test, registerUser, loginUser, getProfile };
