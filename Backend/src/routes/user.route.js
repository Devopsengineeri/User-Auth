const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/validate.middlew");

const {
  Registration,
  home,
  login,
  ForgotPassword,
  userUpload,
  upload,
  sendMail,
  OtpVerify,
  ResetPass,
  SecurePage,
  LogOut,
} = require("../controllers/user.controller");
const validate = require("../middleware/validate.middlew");
const userObjectSchema = require("../validators/userObject.valid");
router.post("/registration", upload.single("profilePicture"), Registration);
router.get("/home", home);
router.post("/", login);
router.patch("/forgotpassword", ForgotPassword);
router.post("/userUpload", upload.single("profilePicture"), userUpload);
router.patch("/sendmail", sendMail);
router.post("/otpverify", OtpVerify);
router.patch("/resetpass", ResetPass);
router.get("/securepage", verifyToken, SecurePage);
router.post("/logout", LogOut);
module.exports = router;
