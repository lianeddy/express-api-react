const express = require("express");
const router = express.Router();
const { userController } = require("../controller");
const { auth } = require("../helper/jwt");
const {
  Register,
  Login,
  keepLogin,
  emailVerification,
  ChangePassword,
  changeDisplayPicture,
} = userController;

router.post("/register", Register);
router.post("/login", Login);
router.post("/keep-login", auth, keepLogin);
router.post("/verification", emailVerification);
router.post("/change-pass", auth, ChangePassword);
router.post("/change-display/:id", changeDisplayPicture);

module.exports = router;
