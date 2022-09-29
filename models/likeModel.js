const mongoose = require("mongoose");

const likeModel = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog",
  },
});

module.exports = mongoose.model("like", likeModel);
