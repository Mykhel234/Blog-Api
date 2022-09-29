const express = require("express");
const router = express.Router();
const {
  createBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
} = require("../handlers/blogController");

router.route("/:userId/blog").post(createBlog);
router
  .route("/:userId/:blogId")
  .get(getOneBlog)
  .patch(updateBlog)
  .delete(deleteBlog);

module.exports = router;
