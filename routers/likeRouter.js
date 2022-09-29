const {
  likeComment,
  unlikeComment,
  likeBlog,
} = require("../handlers/likeController");
const express = require("express");
const router = express.Router();

router.route("/:userId/:blogId/:commentId/like").post(likeComment);
router.route("/:userId/:blogId/like").post(likeBlog);

router.route("/:userId/:blogId/:commentId/:likeId").delete(unlikeComment);
router.route("/:userId/:blogId/:likeId").delete(unlikeComment);

module.exports = router;
