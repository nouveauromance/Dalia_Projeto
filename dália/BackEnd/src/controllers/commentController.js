const commentModel = require("../models/commentModel");

const createComment = async (req, res) => {
<<<<<<< HEAD
    const comment = req.body; 
    const newCommentId = await commentModel.createComment(comment);
    res.status(201).json({ id: newCommentId });
};

const getCommentsByPostId = async (req, res) => {
    const { post_id } = req.params;
    const comments = await commentModel.getCommentByPostId(post_id);
    res.status(200).json(comments);
};

module.exports = {
    createComment,
    getCommentsByPostId,
};
=======
  const comment = req.body; 
  const newCommentId = await commentModel.createComment(comment);
  res.status(201).json({ id: newCommentId });
};

const getCommentsByPostId = async (req, res) => {
  const { post_id } = req.params;
  const comments = await commentModel.getCommentByPostId(post_id);
  res.status(200).json(comments);
};

module.exports = {
  createComment,
  getCommentsByPostId,
};
>>>>>>> fcb7f8c742156e0491883f7705114b80bc058269
