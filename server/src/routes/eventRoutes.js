const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents } = require("../controllers/eventController");
const {
  authenticateToken,
  requireOrganizerOrAdmin,
} = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

router.get("/findAll", getAllEvents);
router.post(
  "/create",
  authenticateToken,
  requireOrganizerOrAdmin,
  upload.single("photo"),
  createEvent
);

module.exports = router;
