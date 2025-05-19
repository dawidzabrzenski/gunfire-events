const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu - tylko admin" });
  }
  next();
};

const requireOrganizerOrAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (role !== "organizer" && role !== "admin") {
    return res
      .status(403)
      .json({ message: "Brak dostępu - tylko organizator lub admin" });
  }
  next();
};

module.exports = { authenticateToken, requireAdmin, requireOrganizerOrAdmin };
