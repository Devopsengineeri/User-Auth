const express = require("express");
require("mongoose");
require("./db/connection");
const cors = require("cors");
// const Registration = require("./models/user.model");
// const userObjectSchema = require("./validators/auth.valid");
//const validate = require("./middleware/validate.middlew");
const router = require("./routes/user.route");
const { truncate } = require("fs");
const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
  origin: "*",
  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  // credentials: true,
};

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send(";afnkgnklfhndth");
});

app.patch("/test/abc", (req, res) => {
  console.log(req.body, "sss");
});

app.use("/app", router);
app.listen(port, () => {
  console.log("Server is running ");
});
