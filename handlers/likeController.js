const likeModel = require("../models/likeModel");
const commentModel = require("../models/commentModel");
const blogModel = require("../models/blogModel");

const likeComment = async (req, res) => {
  try {
    likedBefore = await likeModel.findById(req.params.likeId);
    if (likedBefore) {
      res.status(404).json({
        message: "You have liked this comment before",
      });
    } else {
      const likedComment = await commentModel.findById(req.params.commentId);

      const like = new likeModel({ _id: req.params.userId });
      like.comment = likedComment;
      like.save();

      likedComment.likes.push(like);
      likedComment.save();

      res.status(200).json({
        status: "success",
        data: like,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const unlikeComment = async (req, res) => {
  try {
    const removeLike = await likeModel.findByIdAndDelete(req.params.likeId);

    res.status(200).json({
      status: "success",
      data: removeLike,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const likeBlog = async (req, res) => {
  try {
    const likedBefore = await likeModel.findById(req.params.likeId);
    if (likedBefore) {
      res.status(404).json({
        message: "This blog has been liked before",
        status: "failed",
      });
    } else {
      const blogAboutToBeLiked = await blogModel.findById(req.params.blogId);

      const newLike = await new likeModel(req.body);
      newLike.blog = blogAboutToBeLiked;
      newLike.save();

      blogAboutToBeLiked.likes.push(newLike);
      blogAboutToBeLiked.save();

      res.status(200).json({
        status: "success",
        data: newLike,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  likeComment,
  unlikeComment,
  likeBlog,
};
