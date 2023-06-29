// setup dotenv
require("dotenv").config();

const jwt = require("jsonwebtoken");

// get secret variable from dotenv
const { SECRET } = process.env;

// Export the middleware function
module.exports = {
  isAuthenticated: (req, res, next) => {
    // Pick Authroziation token frpm the header
    const headerToken = req.get("Authorization");

    // if the token is missing, send 401 status
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;

    try {
      // Verify token
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      // set status code 500 (bad request) in case of error
      err.statusCode = 500;
      throw err;
    }

    // Check if the token is invalid or expired
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    // Call the next middleware function
    next();
  },
};
