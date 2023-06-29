const Post = require("../models/post");
const User = require("../models/user");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { privateStatus: false },
      include: [
        {
          model: User,
          required: true,
          attributes: [`username`],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log("failed to fetch allPosts");
    console.log(error);
    res.send(400).json({ message: "Failed to fetch allposts" });
  }
};

const getCurrentUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          required: true,
          attributes: [`username`],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log("Failed to fetch current user posts");
    console.log(error);
    res.send(400).json({ message: "Failed to fetch current user posts" });
  }
};

const addPost = async (req, res) => {
  try {
    const { title, content, status, userId } = req.body;

    await Post.create({
      title: title,
      content: content,
      privateStatus: status,
      userId: userId,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error adding post" });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Post.update(
      { privateStatus: status },
      {
        where: { id: +id },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log("Error while editing a post");
    console.log(error);
    res.status(400).json({ message: "Error editing post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id: +id } });
    res.sendStatus(200);
  } catch (error) {
    console.log("Couldnt delete post");
    console.log(error);
    res.status(400).json({ message: "Error deleting post" });
  }
};

module.exports = {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
};
