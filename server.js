const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
//
const app = express();
//app.use(express.json());
// app.use(cors());

//MongoDB connection
// mongoose.connect("mongodb://localhost:27017/salary_negotiation", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//
app.use(express.static("public"));
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
