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

router.post("/registration", upload.single("profilepicture"), registration);
router.get("/home", home);
router.post("/", login);
router.patch("/forgotpassword", ForgotPassword);
router.post("/userupload", upload.single("profilepicture"), userUpload);
router.patch("/sendmail", sendMail);
router.post("/otpverify", otpverify);
router.patch("/resetpass", resetPass);

module.exports = router;
