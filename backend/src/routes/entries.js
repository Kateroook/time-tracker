const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// Create a new time entry
router.post("/", entryController.createEntry);

// Get all time entries
router.get("/", entryController.getEntries);

module.exports = router;