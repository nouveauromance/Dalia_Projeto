const commentModel = require("../models/commentModel");

const createComment = async (req, res) => {
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