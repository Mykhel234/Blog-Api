const commentModel = require("../models/commentModel");
const blogModel = require("../models/blogModel");

const createComment = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.blogId);

    const newComment = await new commentModel(req.body);

    newComment.blog = blog;
    newComment.save();

    blog.comments.push(newComment);
    blog.save();

    res.status(200).json({
      status: "success",
      data: newComment,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getOneComment = async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.commentId);

    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndDelete(req.params.commentId);

    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getOneComment,
  updateComment,
  deleteComment,
};
