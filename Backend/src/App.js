require("mongoose");
require("./db/connection");
const path = require("path");
const cors = require("cors");
const { truncate } = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/user.route");
const { verifyToken } = require("./middleware/validate.middlew");

const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
  origin: ["http://localhost:5173"],
  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOption));

app.use("/profileupload", express.static(path.join(__dirname, "profileupload")));
console.log(path.join(__dirname, "profileupload"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/app", router);

app.listen(port, () => {
  console.log("Server is running ");
});
