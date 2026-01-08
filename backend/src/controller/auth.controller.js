import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const googleCallback = (req, res) => {
  try {
    // user already exists or is created by passport
    const user = req.user;

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Generated JWT Token:", token);

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/google/success?token=${token}`
    );
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
  }
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, googleId: 'local' });
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    await newUser.save();
    console.log("New user registered:", newUser);
    res.status(201).json({ token });
    res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error." });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ token });

  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Server error." });
  }
}

