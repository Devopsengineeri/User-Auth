const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/userInfo")
  .then(() => {
    console.log("SuccessFull Connection");
  })
  .catch((e) => {
    console.log(e);
  });
