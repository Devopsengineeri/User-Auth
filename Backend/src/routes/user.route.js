const express = require("express");
const router = express.Router();
//const multer = require("multer");

const {
  registration,
  home,
  login,
  userForgotPassword,
  userUpload,
  upload,
} = require("../controllers/user.controller");
const validate = require("../middleware/validate.middlew");
const userObjectSchema = require("../validators/userObject.valid");
console.log(registration);

router.post("/registration", upload.single("profilePicture"), registration);
router.get("/home", home);
router.get("/login", login);
router.patch("/userForgotPassword", userForgotPassword);
router.post("/userUpload", upload.single("profilePicture"), userUpload);
module.exports = router;
