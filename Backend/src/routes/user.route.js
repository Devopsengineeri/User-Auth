const express = require("express");
const router = express.Router();
//const multer = require("multer");

const {
  registration,
  home,
  login,
  ForgotPassword,
  userUpload,
  upload,
  sendMail,
  otpverify,
  resetPass,
} = require("../controllers/user.controller");
const validate = require("../middleware/validate.middlew");
const userObjectSchema = require("../validators/userObject.valid");
console.log(registration);

router.post("/registration", upload.single("profilePicture"), registration);
router.get("/home", home);
router.post("/", login);
router.patch("/ForgotPassword", ForgotPassword);
router.post("/userUpload", upload.single("profilePicture"), userUpload);
router.patch("/sendMail", sendMail);
router.get("/otpverify", otpverify);
router.patch("/resetPass", resetPass);

module.exports = router;
