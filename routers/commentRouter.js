const {
  createComment,
  getOneComment,
  updateComment,
  deleteComment,
} = require("../handlers/commentController");
const express = require("express");

const router = express.Router();

router.route("/:userId/:blogId/comment").post(createComment);
router
  .route("/:userId/:blogId/:commentId")
  .get(getOneComment)
  .patch(updateComment)
  .delete(deleteComment);

module.exports = router;
