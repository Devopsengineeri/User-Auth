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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOption = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(cors(corsOption));
app.get("/", (req, res) => {
  res.send(";afnkgnklfhndth");
});

app.use("/app", router);
app.listen(port, () => {
  console.log("Server is running ");
});
