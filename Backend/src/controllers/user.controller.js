const { json } = require("stream/consumers");
const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const { message } = require("../validators/userObject.valid");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
const path = require("path");
const { rmSync } = require("fs");
//user uplode file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const registration = async (req, res) => {
  try {
    const { firstName, lastName, email, dob, password, confirmPassword } =
      req.body;

    const userExist = await User.findOne({
      email: email,
    });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: "User Already Exit with this email Try Diffrent" });
    }
    const profilePicture = {
      path: req.file.path, // Full file path
      filename: req.file.filename, // Generated filename
    };
    console.log(profilePicture, "jjjjj");
    const Store = await User.create({
      firstName,
      lastName,
      email,
      dob,
      password,
      confirmPassword,
      profilePicture: profilePicture.path,
    });
    res.status(201).json({
      msg: "Data Store SuccessFull",
      token: await Store.generateToken(),
      userId: Store._id.toString(),
    });
  } catch (error) {
    console.error({ msg: "this is error" });
    res.status(500).json("Internel Server Error");
  }
};

const home = async (req, res) => {
  try {
    res.send("jdkjsdvfdln");
    console.log("ghkhhhhhhdsl");
  } catch (error) {
    res.send(error);
  }
};

//this is user login page
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and Password are required" });
    }
    const userEmailMatch = await User.findOne({
      email: email,
    });
    if (!userEmailMatch) {
      return res.status(404).json({ msg: "User not found,Please SignUp !!" });
    }
    const isMatchPassword = await bcrypt.compare(
      password,
      userEmailMatch.password
    );
    if (!isMatchPassword) {
      return res.status(401).json({ msg: "Invalid email and password" });
    }
    res.status(200).json({ msg: "login Successfull" });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//forgot Password
const userForgotPassword = async (req, res) => {
  try {
    // object destrcuturing
    const { email } = req.body;
    if (!email) {
      return res.status(403).json({ message: "Bad Request:-Email Not Found" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    const otp = Math.ceil(Math.random() * 1000000);
    //exppire timing otp
    const otpExpiration = new Date().getTime() + 1 * 60 * 1000;
    // same mail pr mail krna h aur bolna h=ki bhai otp submit kro
    await User.findOneAndUpdate(
      { email },
      {
        otp,
        otpExpiration,
      }
    );
    return res
      .status(200)
      .json({ message: "Request Sent Successfully! Please Check Your email" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//const upload = multer({ dest: "uploads/" });

const userUpload = async (req, res) => {
  try {
    console.log(req.file, "sjdfisdjgifdjjfd");
    const { profilePicture } = req.file;
    if (!req.file) {
      return res.status(400).send({ msg: "No file uploade" });
    }
    // const profilePicture = {
    //   path: req.file.path,
    //   filename: req.file.originalname,
    // };
    // await User.create({ profilePicture });
    res.status(200).send({ msg: "Profile picture upload Succesfull" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};

module.exports = {
  registration,
  home,
  login,
  userForgotPassword,
  userUpload,
  upload,
};