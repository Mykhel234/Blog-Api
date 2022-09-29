const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      res.status(400).json({
        message: "this email already signed up with us",
        status: "failed",
      });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedpassword = await bcrypt.hash(password, salt);

      const token = await crypto.randomBytes(64).toString("hex");
      const myToken = jwt.sign({ token }, "myBlogSecret", { expiresIn: "2d" });

      const user = await userModel.create({
        username,
        email,
        password: hashedpassword,
        verifiedToken: myToken,
      });

      res.status(201).json({
        status: "success",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: "failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    findUser = await userModel.findOne({ email });
    if (findUser) {
      const checkpassword = await bcrypt.compare(password, findUser.password);
      if (checkpassword) {
        const myToken = jwt.sign({ _id: findUser._id }, "myBlogSecret", {
          expiresIn: "2d",
        });

        res.status(200).json({
          status: "success",
          data: myToken,
        });
      } else {
        throw Error("Icorrect password");
      }
    } else {
      throw Error(
        "this email does not exist in our database, please sign up with us"
      );
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId).populate("blogs");

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.userId);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failed",
    });
  }
};

module.exports = {
  signUpUser,
  login,
  getOneUser,
  getAllUser,
  updateUser,
  deleteUser,
};
