const express = require("express");
const User = require("../db/userModel"); // Assuming userModel defines the User model
const router = express.Router();


router.get("/list", async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
      const user = await User.findById(userId);
      if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

