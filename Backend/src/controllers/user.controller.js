const { json } = require("stream/consumers");
const User = require("../models/user.model");
const nodeMailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { message } = require("../validators/userObject.valid");
const multer = require("multer");

const path = require("path");
const { rmSync, fstat } = require("fs");
//user uplode file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "src/profileupload");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//user registration form
const Registration = async (req, res) => {
  try {
    console.log(req.body, "dshdfjdjhndfl");
    const { firstName, lastName, email, dob, password, confirmPassword } =
      req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: "User Already Exit with this email Try Diffrent" });
    }
    const profilePicture = {
      path: req.file.path.toString().replaceAll("\\", "/").replace("src/", ""),
      filename: req.file.filename, // Generated filename
    };
    const Store = await User.create({
      firstName,
      lastName,
      email,
      dob,
      password,

      profilePicture: profilePicture.path,
    });
    res.status(201).json({
      msg: "Data Store SuccessFull",
    });
  } catch (error) {
    console.error({ msg: "this is error" });
    res.status(500).json("Internel Server Error");
  }
};

const home = async (req, res) => {
  try {
    res.send("jdkjsdvfdln");
  } catch (error) {
    res.send(error);
  }
};
console.log(Registration, "shfdffdjkl");
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
    console.log(password, userEmailMatch.password);
    console.log(isMatchPassword);
    if (!isMatchPassword) {
      return res.status(401).json({ msg: "Invalid email and password" });
    }

    const authToken = JWT.sign(
      { id: userEmailMatch._id, email: userEmailMatch.email },
      "secretKey",
      {
        expiresIn: "2h",
      }
    );

    // Set cookie
    res.cookie("authToken", authToken, {
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // Enable secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-site cookies
    });
    console.log("token ", authToken);
    return res
      .status(200)
      .json({ msg: "login Successfull", user: userEmailMatch });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//forgot Password
const ForgotPassword = async (req, res) => {
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
    // same mail pr mail krna h aur bolna h ki bhai otp submit kro
    await User.findOneAndUpdate(
      { email },
      {
        otp,
        otpExpiration,
      }
    );

    const transporter = await nodeMailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'cristopher.hoppe77@ethereal.email',
        pass: 'bxnd1HyxEpYqJQGqt3'
      },
    });
    // Set up the email transporter
    await transporter.sendMail({
      from: ' "User-Auth" <Userauth@ethereal.email>', // sender address
      to: email,
      subject: "OTP for Password Reset", // subject line
      text: `Your OTP for resetting your password is: ${otp}`, // plain text body
      html: `<p>Your OTP for resetting your password is: <strong>${otp}</strong></p>`,
    });
    return res
      .status(200)
      .json({ message: "Request Sent Successfully! Please Check Your email" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const userUpload = async (req, res) => {
  try {
    console.log(req.file, "sjdfisdjgifdjjfd");
    const { profilePicture } = req.file;
    if (!req.file) {
      return res.status(400).send({ msg: "No file uploade" });
    }
    res.status(200).send({ msg: "Profile picture upload Succesfull" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error" });
  }
};

//send email
const sendMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.send("eamil is required");
    }
    const transporter = await nodeMailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "maya.rath26@ethereal.email",
        pass: "kgnRf9KgggYnv6jFCZ",
      },
    });

    let info = await transporter.sendMail({
      from: ' "Sumit kumar" <jaden.kozey@ethereal.email>', // sender address
      to: email,
      subject: "hello sumit", //subject line
      text: "hello yt thapa", // plain text body
      html: "<b>hello ty sumit</b>", // html body
    });
    console.log("info:", info);
    res.json({ msg: "successfull send eamil", info });
  } catch (error) {
    res.json(error);
  }
};

//otp validation
const OtpVerify = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp) {
      res.status(400).json({ msg: "Bad Request:- OTP is required" });
    }
    const isEmail = await User.findOne({ email: email });
    if (!isEmail) {
      res.status(404).json({ msg: "Not Found" });
    }
    if (isEmail.otp !== otp) {
      res.status(401).json({ msg: " invalid OTP" });
    }
    res.status(200).json({ msg: "Your OTP Verify Successfull" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//reset password
const ResetPass = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      res.status(400).json({ msg: "Bad request:- Password is required" });
    }
    const isEmail = await User.findOne({ email: email });
    if (!isEmail) {
      res.status(404).json({ msg: "Not found" });
    }
    console.log(isEmail, "dsfsdgsfh");
    isEmail.password = password;

    await isEmail.save();

    res.status(200).json({ msg: "Password reset Successfull" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
};

const SecurePage = async (req, res) => {
  try {
    console.log(req.user, "dgdhdhdg");
    const user = req.user;
    res.status(200).json({ msg: "WelCome to Secour Page!!!!", user });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};
// user logOut
const LogOut = async (req, res) => {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      return res.status(401).json({ msg: "User not authenticated" });
    }
    res.clearCookie("authToken", { httpOnly: true });
    res.status(200).json({ msg: "LogOut Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server err" });
  }
};
// newPassword add
const updatePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res.status(400).json({
        msg: "Bad Request:-Email , oldpassword, newpassword are required",
      });
    }
    const userId = req.user.id;
    const user = await User.findById({ _id: userId });

    if (!user) {
      res.status(404).json({ msg: "Not Found" });
    }
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Wrong password." });
    }
    user.password = newpassword;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ msg: "internal Server error" });
  }
};
module.exports = {
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
  updatePassword,
};
