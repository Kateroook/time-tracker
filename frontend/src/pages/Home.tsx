import React, { useEffect, useState } from "react";
import { fetchEntries } from "../api/entries";
import type { TimeEntry } from "../types/entry";
import TimeEntryForm from "../components/TimeEntryForm";
import EntryList from "../components/EntryList";
import { Box, Typography } from "@mui/material";

const Home: React.FC = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const loadEntries = async () => {
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch entries");
    }
  };


  useEffect(() => {
    loadEntries();
  }, []);

  const handleEntryCreated = (entry: TimeEntry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const handleEntryUpdated = (updated: TimeEntry) => {
    setEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleEntryDeleted = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, #f5f5f7 0%, #ffffff 60%)",
        py: { xs: 6, md: 12 },
      }}
    >
      <Box sx={{ width: "100%", px: { xs: 2, md: 6 } }}>
        <Box
          sx={{
            mb: 6,
            textAlign: "center",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem" },
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#1d1d1f",
              mb: 1,
            }}
          >
            Mini Time Tracker
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 4, sm: 6 },
          }}
        >
          <Box sx={{ maxWidth: 700, width: "100%", mx: "auto" }}>
            <TimeEntryForm onEntryCreated={handleEntryCreated} />
          </Box>

          <Box sx={{ maxWidth: 700, width: "100%", mx: "auto" }}>
            <EntryList
              entries={entries}
              onEntryUpdated={handleEntryUpdated}
              onEntryDeleted={handleEntryDeleted}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;