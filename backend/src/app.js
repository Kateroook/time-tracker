const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🕒 Time Tracker Backend running");
});

app.get("/health", async (req, res) => {
  try {
    const count = await prisma.timeEntry.count();
    res.json({ status: "ok", entries: count });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = app;
