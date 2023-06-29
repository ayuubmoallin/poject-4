require("dotenv").config();
const { PORT } = process.env;

const express = require("express");
const app = express();
const cors = require("cors");

const { sequelize } = require("./util/database");
const User = require("./models/user");
const Post = require("./models/post");

const { logout, login, register } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/post");

app.use(express.json()); // to parse & read req.body
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User, { foreignKey: "userId" });

// endpoints for authentication
app.post("/register", register);
app.post("/login", login);

// endpoint(s) for GET post requires no auth
app.get("/posts", getAllPosts);

// CRUD endpoints for POSTS - requires auth
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connect to the database:", error);
  });
