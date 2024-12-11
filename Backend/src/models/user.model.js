const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");
const { boolean, required, string } = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  isAuth: { type: Boolean, default: false },
  otp: { type: String, default: null },
  profilePicture: { type: String },
});

//Add a method to generate a JWT token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAuth: this.isAuth,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error(error);
  }
};

//hashing password of user
userSchema.pre("save", async function (next) {
  console.log("sdjfsufihreuuuu", this);
  const userPassword = this;
  if (!userPassword.isModified("password")) {
    next();
  }

  try {
    const setRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userPassword.password, setRound);
    userPassword.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
