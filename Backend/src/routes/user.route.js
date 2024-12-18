const express = require("express");
const router = express.Router();
//const multer = require("multer");

const {
  registration,
  home,
  login,
  forgotpassword,
  userUpload,
  upload,
  sendMail,
  otpverify,
  resetpass,
  // securepage,
} = require("../controllers/user.controller");
const validate = require("../middleware/validate.middlew");
const userObjectSchema = require("../validators/userObject.valid");
console.log(registration);

router.post("/registration", upload.single("profilePicture"), registration);
router.get("/home", home);
router.post("/", login);
// router.get('/verify-session', verifyUserSession)
router.patch("/forgotpassword", forgotpassword);
router.post("/userUpload", upload.single("profilePicture"), userUpload);
router.patch("/sendmail", sendMail);
router.post("/otpverify", otpverify);
router.patch("/resetpass", resetpass);
// router.get("/securepage", securepage);

module.exports = router;
