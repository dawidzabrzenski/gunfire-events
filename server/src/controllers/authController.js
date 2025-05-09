const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const {
  createUser,
  findByEmail,
  findByUsername,
  findById,
  verifyUser,
} = require("../models/userModel");

const {
  createVerificationToken,
  upsertVerificationToken,
  findByToken,
  deleteByToken,
} = require("../models/emailVerificationModel");

const { sendVerificationEmail } = require("../utils/emailService");

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
    if (existingUser)
      return res.status(400).json({ message: "Email is already in use" });

    const existingUsername = await findByUsername(username);
    if (existingUsername)
      return res.status(400).json({ message: "Username is already in use" });

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
      is_active: true,
      is_verified: false,
      is_approved: role === "organizer" ? false : true,
    });

    const token = uuidv4();
    await createVerificationToken(user.id, token);
    await sendVerificationEmail(email, token);

    res.status(201).json({
      message: "User created. Please check your email to verify your account.",
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmail(email);
    if (!user) return res.status(401).json({ message: "Nieprawidłowe dane" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Nieprawidłowe dane" });

    if (!user.is_verified)
      return res.status(403).json({ message: "Konto niezweryfikowane" });

    if (user.role === "organizer" && !user.is_approved) {
      return res.status(403).json({
        message: "Konto organizatora wymaga aktywacji przez administratora",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({ message: "Zalogowano" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Użytkownik nieznaleziony" });

    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const data = await findByToken(token);
    if (!data) return res.status(400).json({ message: "Nieprawidłowy token" });

    if (new Date(data.expires_at) < new Date()) {
      return res.status(400).json({ message: "Token wygasł" });
    }

    await verifyUser(data.user_id);
    await deleteByToken(token);

    res.json({ message: "Konto zostało aktywowane" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });

    if (user.is_verified)
      return res
        .status(400)
        .json({ message: "Konto zostało już zweryfikowane" });

    const token = uuidv4();
    await upsertVerificationToken(user.id, token);
    await sendVerificationEmail(email, token);

    res.json({ message: "Link aktywacyjny został wysłany ponownie" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  resendVerification,
};
