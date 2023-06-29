require("dotenv").config();
const { SECRET } = process.env;
const  User  = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ where: { username: username } });

    if (foundUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        username: username,
        hashedPass: hashedPassword,
      });

      const token = createToken(
        newUser.dataValues.username,
        newUser.dataValues.id
      );
      const exp = Date.now() + 1000 * 60 * 60 * 48;

      res.send({
        username: newUser.dataValues.username,
        userId: newUser.dataValues.id,
        token: token,
        exp: exp,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ where: { username: username } });

    if (!foundUser) {
      res.status(400).json({ message: 'Cannot log in. Invalid username or password.' });
    } else {
      const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass);

      if (isAuthenticated) {
        const token = createToken(foundUser.username, foundUser.id);
        const exp = Date.now() + 1000 * 60 * 60 * 48;

        res.send({
          username: foundUser.username,
          userId: foundUser.id,
          token: token,
          exp: exp
        });
      } else {
        res.status(400).json({ message: 'Cannot log in. Invalid username or password.' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Logout function
const logout = (req, res) => {
  // Placeholder code for logout logic
  console.log("Logout function called");
};

module.exports = {
  login,
  logout,
  register,
};
