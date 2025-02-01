const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/salary", auth, async (req, res) => {
  try {
    const { currentSalary, targetSalary, notes } = req.body;
    const user = await User.findById(req.user.userId);

    user.salaryData.push({
      date: new Date(),
      currentSalary,
      targetSalary,
      notes,
    });

    await user.save();
    res.json({ message: "Salary data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
