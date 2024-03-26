const { AdminModal } = require("../Modal/admin.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validatePasswordStrength = (password) => {
  if (password.length >= 8) {
    return true; // Strong password
  }
  return false; // Weak password
};

const Login = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (username === "" || password === "") {
      return res
        .status(400)
        .json({ msg: "Username and password are required" });
    }
    if (confirmPassword !== "" && password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    }
    if (!validatePasswordStrength(password)) {
      return res
        .status(400)
        .json({
          msg: "Password is too weak. Must be at least 8 characters long.",
        });
    }
    if (username === "Admin") {
      let admin = await AdminModal.findOne({ username: "Admin" });
      if (!admin) {
        const encrypt = await bcrypt.hash(password, 10);
        const newAdmin = new AdminModal({ username, password: encrypt });
        admin = await newAdmin.save();
      }
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { username: admin.username },
          process.env.ADMIN,
          { expiresIn: "30m" }
        );
        const expireToken = jwt.verify(token, process.env.ADMIN);
        const name = admin.username;
        return res.status(200).json({
          token,
          name,
          expiresIn: expireToken.exp,
          msg: "Login Successfully",
        });
      } else {
        return res.status(404).json({ msg: "Invalid Password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, msg: "Something went wrong" });
  }
};

module.exports = {
  Login
};
