
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';



dotenv.config();


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
      role : 'user',
    });
    

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration Failed: server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
 
  const { email, password } = req.body;
  
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    // Compare password if user
    if(user.role === 'user'){
      const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    }else{
      const isMatch = password === user.password;
      if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pwd, ...userData } = user;

    res
      .status(200)
      .json({
        message: "Signed In Successfully",
        user: userData,
        token
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login Failed : server error" });
  }
};
