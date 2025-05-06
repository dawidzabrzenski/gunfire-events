const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  createUser,
  findByEmail,
  findByUsername,
} = require("../models/userModel");

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    phone,
    voivodeship_id,
    group_link,
    facebook_link,
    role,
  } = req.body;

  try {
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const existingUsername = await findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
      phone,
      voivodeship_id,
      group_link,
      facebook_link,
      role,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({ message: "Logged in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

module.exports = { register, login, logout };
