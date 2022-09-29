const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

const createBlog = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);

    const newBlog = await new blogModel(req.body);
    newBlog.user = user;
    newBlog.save();

    user.blogs.push(newBlog);
    await user.save();

    res.status(201).json({
      status: "success",
      data: newBlog,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

const getOneBlog = async (req, res) => {
  try {
    const blog = await blogModel
      .findById(req.params.blogId)
      .populate("comments");

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const update = await blogModel.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: update,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const erase = await blogModel.findByIdAndDelete(req.params.blogId);

    res.status(200).json({
      status: "success",
      data: erase,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

module.exports = {
  createBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
};
