const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "like",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentModel);
