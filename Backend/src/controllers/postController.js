const Post = require("../models/post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: {
        postId: id,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, category, description, detail } = req.body;
    const post = await Post.create({
      title,
      category,
      description,
      detail,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, detail } = req.body;
    const [update] = await Post.update(
      {
        title,
        category,
        description,
        detail,
      },
      { where: { postId: id } }
    );
    if (update) {
      const updatedPost = await Post.findByPk(id);
      res.json({ message: "Post updated", updatedPost });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.destroy({ where: { postId: id } });
    if (deleted) {
      res.json({ message: "Post deleted" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
