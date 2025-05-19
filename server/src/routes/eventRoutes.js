const express = require("express");
const router = express.Router();
const { createEvent } = require("../controllers/eventController");
const {
  authenticateToken,
  requireOrganizerOrAdmin,
} = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

router.post(
  "/create",
  authenticateToken,
  requireOrganizerOrAdmin,
  upload.single("photo"),
  createEvent
);

module.exports = router;
