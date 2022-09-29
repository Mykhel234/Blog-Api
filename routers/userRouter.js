const express = require("express");
const {
  signUpUser,
  login,
  getOneUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../handlers/userController");

const router = express.Router();

router.route("/register").post(signUpUser);
router.route("/signIn").post(login);

router.route("/").get(getAllUser);

router.route("/:userId").patch(updateUser).get(getOneUser).delete(deleteUser);

module.exports = router;
