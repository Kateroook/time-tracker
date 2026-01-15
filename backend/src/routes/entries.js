const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// Create a new time entry
router.post("/", entryController.createEntry);

// Get all time entries
router.get("/", entryController.getEntries);

// Update entry by id
router.patch("/:id", entryController.updateEntry);

// Delete entry by id
router.delete("/:id", entryController.deleteEntry);

module.exports = router;