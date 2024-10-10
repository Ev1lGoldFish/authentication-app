const mongoose = require("mongoose");

//username: harshaneelathi
// password: xdeNV90VFxyxjUD9

const mongo_url = process.env.MONGO_CONNECTION;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error: ".error);
  });
