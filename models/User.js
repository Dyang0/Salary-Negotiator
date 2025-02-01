const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salaryData: [
    {
      date: Date,
      currentSalary: Number,
      targetSalary: Number,
      notes: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
