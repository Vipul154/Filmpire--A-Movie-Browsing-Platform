import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is invalid." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be atleast 6 characters.",
        });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists." });
    }

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    //Hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //This will hash the password.

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Let's create the user profile now
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      image: image,
    });

    //just before saving the user

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res
      .status(201)
      .json({
        success: true,
        user: { ...newUser._doc, password: "" },
        message: "User created successfully",
      });
    // removing password from the response, and sending the response.
    // We just stored the password as it is, which is not a good practice.
  } catch (error) {
    console.log("Error in Signup Controller : " + error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    // Here the password is coming from req.body and the user.password is what we have saved in the database after hashing it using brypt.js

    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(`Error in Login Controller : ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-filmpire");
    res
      .status(200)
      .json({ success: true, message: "logged out successfully." });
  } catch (error) {
    console.log(`Error in the Logout Controller : ${error.message}`);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log(`Error in AuthCheck Controller : ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
