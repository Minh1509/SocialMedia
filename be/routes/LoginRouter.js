const express = require("express");

const User = require("../db/userModel");
const router = express.Router();
router.post("/login", async (req, res) => {
  const { loginName, passWord } = req.body;
  try {
    // Truy vấn cơ sở dữ liệu để kiểm tra thông tin đăng nhập
    const user = await User.findOne({
      login_name: loginName,
      password: passWord,
    });
    if (user) {
      res.json({ success: true, message: "Login successful", user });
    } else {
      res.json({ success: false, message: "Tên tài khoản hoặc mật khẩu không đúng" });
    }
  } catch (err) {}
});

router.post("/register", async (req, res) => {
  const {
    loginName,
    passWord,
    firstName,
    lastName,
    location,
    description,
    occupation,
  } = req.body;
  if (loginName !== "" && passWord !== "") {
    const existingUser = await User.findOne({ login_name: loginName });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Tên đăng nhập đã tồn tại , vui lòng chọn tên khác",
      });
    }
    // Tạo một người dùng mới và lưu vào cơ sở dữ liệu
    const user = new User({
      login_name: loginName,
      password: passWord,
      first_name: firstName,
      last_name: lastName,
      location,
      description,
      occupation,
    });

      await user.save();
      res.json({
        success: true,
        message: "Đăng ký thành công",
      });
    
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(error => {
      if (error) {
          console.error("Error logging out:", error);
          res.status(500).json({ message: "Internal Server Error" });
      } else {
          res.sendStatus(200);
      }
  });
});
module.exports = router;
