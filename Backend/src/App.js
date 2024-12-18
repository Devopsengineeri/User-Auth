const express = require("express");
const cookieParser = require("cookie-parser");
const path = require('path')
require("mongoose");
require("./db/connection");
const cors = require("cors");
// const Registration = require("./models/user.model");
// const userObjectSchema = require("./validators/auth.valid");
//const validate = require("./middleware/validate.middlew");
const router = require("./routes/user.route");
const { truncate } = require("fs");
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(path.join(__dirname, 'uploads'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(verifyToken);

app.get("/", (req, res) => {
  res.send(";afnkgnklfhndth");
});

app.patch("/test/abc", (req, res) => {
  console.log(req.body, "sss");
});

app.use("/app", router);


// app.get('/image' , async(req,res)=>{

// })


app.listen(port, () => {
  console.log("Server is running ");
});
