import React from "react";
import type { TimeEntry } from "../types/entry";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";


interface Props {
  entries: TimeEntry[];
}

const formatDate = (iso: string) =>
  dayjs(iso).format("DD MMM YYYY");

const EntryList: React.FC<Props> = ({ entries }) => {
  const grouped: Record<string, TimeEntry[]> = {};

  entries.forEach((e) => {
    const key = e.date.split("T")[0];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) =>
    dayjs(b).diff(dayjs(a))
  );

  const grandTotal = entries.reduce((sum, e) => sum + e.hours, 0);

  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
        mt: 5,
        background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
        borderRadius: "20px",
        p: { xs: 2, sm: 3, md: 4 },
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1.4rem", sm: "1.75rem" },
            color: "#1d1d1f",
            letterSpacing: "-0.02em",
          }}
        >
          History
        </Typography>

        <Box
          sx={{
            px: 2.5,
            py: 1,
            borderRadius: "999px",
            backgroundColor: "#f5f5f7",
            fontWeight: 500,
            fontSize: "0.95rem",
            color: "#1d1d1f",
          }}
        >
          Total: {grandTotal.toFixed(2)} hrs
        </Box>
      </Box>

      {/* Empty state */}
      {sortedDates.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            color: "#8e8e93",
          }}
        >
          <Typography sx={{ mt: 2, fontSize: "1.05rem" }}>
            No entries yet
          </Typography>
        </Box>
      ) : (
        <Stack spacing={4}>
          {sortedDates.map((dateKey) => {
            const dayEntries = grouped[dateKey];
            const dayTotal = dayEntries.reduce(
              (sum, e) => sum + e.hours,
              0
            );

            return (
              <Box key={dateKey}>
                {/* Date header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "#1d1d1f",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {formatDate(dateKey)}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#6e6e73",
                    }}
                  >
                    {dayTotal.toFixed(2)} hrs
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Entries */}
                <Stack spacing={1.5}>
                  {dayEntries.map((entry) => (
                    <Paper
                      key={entry.id}
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e5ea",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f5f5f7",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 0.75,
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "#1d1d1f",
                          }}
                        >
                          {entry.project}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "#007aff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {entry.hours}h
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          color: "#6e6e73",
                          lineHeight: 1.5,
                        }}
                      >
                        {entry.description}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default EntryList;
