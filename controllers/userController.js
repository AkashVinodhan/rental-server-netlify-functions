const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//util functions

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword);
};

// generate jwt token
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//*LOGIN

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    if (await comparePassword(password, user.password)) {
      const token = genToken(user._id);

      //save token in DB
      user.token = token;
      await user.save();

      res.send({
        user: {
          name: user.name,
          token: user.token,
          email: user.email,
        },
      });
    } else {
      res.status(400).send({ message: "Incorrect Password" });
    }
  }
  if (!user) {
    res.status(400).send("User not found");
  }
};

//*SIGNUP

const registerUser = async (req, res) => {
  const { username, password, email, name } = req.body;

  const userExists = await User.findOne({ email });

  //check if user already in DB
  if (userExists) {
    res.status(400).send({ message: "Mail id already exists" });
  }

  //create new user if not
  const user = await User.create({
    name,
    email,
    username,
    password: await hashPassword(password),
  });

  //if successfully created
  if (user) {
    const token = genToken(user._id);

    //save token in DB
    user.token = token;
    await user.save();

    res.status(201).send({
      user: {
        name: user.name,
        token: user.token,
        email: user.email,
      },
    });
  } else {
    res.status(400).send({ messsage: "Signup failed!" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.status(200).send("Logout successfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginUser, registerUser, logoutUser };
