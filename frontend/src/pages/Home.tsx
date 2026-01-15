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
    <Box className="ds-flex-col" sx={{ py: { xs: "var(--space-6)", md: "var(--space-12)" } }}>
      <Box className="ds-w-full" sx={{ px: { xs: 2, md: 6 } }}>
        <Box className="ds-mb-4 ds-text-center ds-max-w-md ds-mx-auto">
          <Typography
            className="ds-heading ds-heading-lg-sm"
          >
            Mini Time Tracker
          </Typography>
        </Box>

        <Box className="ds-flex-col" sx={{ gap: { xs: 4, sm: 6 } }}>
          <Box className="ds-max-w-sm ds-w-full ds-mx-auto">
            <TimeEntryForm onEntryCreated={handleEntryCreated} />
          </Box>

          <Box className="ds-max-w-sm ds-w-full ds-mx-auto">
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