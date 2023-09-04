const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");

const getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};

const setPosts = async (req, res) => {
  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un message" });
  }
  try {
    res.status(200).json(post);
    // res.json({ message: "It's good" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  res.status(200);

  if (!post) {
    res.status(400).json({ message: "Ce post n'existe pas" });
  }

  const updatePost = await postModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
};

const deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400).json({ message: "Ce post n'existe pas" });
  }

  await post.deleteOne();
  res.status(200).json("Message supprimé !" + post);
};

const likePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};
const dislikePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  setPosts,
  getPosts,
  editPost,
  deletePost,
  likePost,
  dislikePost,
};
