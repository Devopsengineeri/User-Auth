const Jwt = require("jsonwebtoken");
const { parse } = require("path");
const User = require("../models/user.model");

const validate = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.validateAsync(req.body);
    req.body = validated;
    next();
  } catch (error) {
    res.status(400).json({ msg: "middleware validator not exit", error });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies["authToken"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const parseToken = Jwt.verify(token, "secretKey");
    if (!parseToken) {
      return res.status(404).json({ message: "Not Found" });
    }
    const user = await User.findById(parseToken.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
module.exports = { validate, verifyToken };
