import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  console.log(req.body);
  try {
    const { fullName, userName, email, password, confirmedPassword, gender } =
      req.body;
    if (password !== confirmedPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Password do not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Username already taken" });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // avatar profile picture
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      await generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ status: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
