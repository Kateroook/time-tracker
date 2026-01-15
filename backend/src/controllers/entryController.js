const entryService = require("../services/entryService");
const { validateEntry } = require("../validators/entryValidator");

async function createEntry(req, res) {
  try {
    const { date, project, hours, description } = req.body;

    validateEntry({ date: new Date(date), project, hours, description });

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


async function updateEntry(req, res) {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const updated = await entryService.updateEntry(Number(id), description);

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteEntry(req, res) {
  try {
    const { id } = req.params;
    await entryService.deleteEntry(Number(id));
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = { createEntry, getEntries, updateEntry, deleteEntry};