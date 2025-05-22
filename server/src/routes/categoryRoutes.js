const express = require("express");
const router = express.Router();
const { getAllCategories } = require("../controllers/categoryController");
const {
  authenticateToken,
  requireOrganizerOrAdmin,
} = require("../middleware/authMiddleware");

router.get("/findAll", getAllCategories);

module.exports = router;
