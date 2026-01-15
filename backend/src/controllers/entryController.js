const entryService = require("../services/entryService");

async function createEntry(req, res) {
  try {
    const { date, project, hours, description } = req.body;

    const entry = await entryService.createEntry({
      date: new Date(date),
      project,
      hours,
      description,
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getEntries(req, res) {
  try {
    const entries = await entryService.getEntries();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
}

module.exports = { createEntry, getEntries};