const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  // Check if a user is an admin based on their ID
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUser = await userModel.findById(loggedInUserId);
      if (loggedInUser) {
        res.json({ role: loggedInUser.userRole });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  // Get all registered users
  async allUser(req, res) {
    try {
      let allUser = await userModel.find({}).sort({ _id: -1 });
      res.json({ users: allUser });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  // Handle User Registration
  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};

    // Basic validation
    if (!name || !email || !password || !cPassword) {
      error = { message: "All fields must be required" };
      return res.json({ error: error.message });
    }

    if (name.length < 3 || name.length > 25) {
      return res.json({ error: "Name must be between 3-25 characters" });
    }

    if (password !== cPassword) {
      return res.json({ error: "Passwords do not match" });
    }

    if (!validateEmail(email)) {
      return res.json({ error: "Email is not valid" });
    }

    try {
      // Check if email already exists
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        return res.json({ error: "Email already exists" });
      }

      // Hash password for security
      const hashedPassword = bcrypt.hashSync(password, 10);
      name = toTitleCase(name);

      // IMPORTANT: 0 for Customer, 1 for Admin
      // By default, every new signup is a Customer (0)
      let newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        userRole: 0, 
      });

      let savedUser = await newUser.save();
      if (savedUser) {
        return res.json({ success: "Account created successfully. Please login." });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Handle User Login
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "Fields must not be empty" });
    }

    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({ error: "Invalid email or password" });
      }

      // Verify password with hashed password in DB
      const isMatch = await bcrypt.compare(password, data.password);
      if (isMatch) {
        // Sign JWT token with ID and Role
        const token = jwt.sign(
          { _id: data._id, role: data.userRole },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.json({
          token: token,
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.userRole
          }
        });
      } else {
        return res.json({ error: "Invalid email or password" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const authController = new Auth();
module.exports = authController;