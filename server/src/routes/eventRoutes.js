const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventsByParams,
  getEventById,
  createEvent,
} = require("../controllers/eventController");
const {
  authenticateToken,
  requireOrganizerOrAdmin,
} = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

router.get("/findAll", getAllEvents);
router.get("/findByParams", getEventsByParams);
router.get("/findById/:id", getEventById);
router.post(
  "/create",
  authenticateToken,
  requireOrganizerOrAdmin,
  upload.single("photo"),
  createEvent
);

module.exports = router;
