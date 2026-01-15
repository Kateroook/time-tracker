import React, { useState }  from "react";
import type { TimeEntry } from "../types/entry";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  IconButton,
  TextField, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import dayjs from "dayjs";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { updateEntry, deleteEntry } from "../api/entries";


interface Props {
  entries: TimeEntry[];
  onEntryUpdated: (entry: TimeEntry) => void;
  onEntryDeleted: (id: number) => void;
}

const formatDate = (iso: string) =>
  dayjs(iso).format("DD MMM YYYY");

const EntryList: React.FC<Props> = ({ 
    entries,
    onEntryUpdated,
    onEntryDeleted,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

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

    const handleSaveEdit = async (entry: TimeEntry) => {
    const updated = await updateEntry(entry.id, editValue);
    onEntryUpdated(updated);
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteEntry(deleteId);
    onEntryDeleted(deleteId);
    setDeleteId(null);
  };
  
  return (
    <Box
      sx={{
        width: "100%",
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
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
                        <IconButton
                            size="small"
                            onClick={() => {
                            setEditingId(entry.id);
                            setEditValue(entry.description);
                            }}
                        >
                            <Edit2 size={16} />
                        </IconButton>

                        <IconButton
                            size="small"
                            onClick={() => setDeleteId(entry.id)}
                        >
                            <Trash2 size={16} />
                        </IconButton>
                        </Box>
                      </Box>

{/* Description */}
                  {editingId === entry.id ? (
                    <>
                      <TextField
                        value={editValue}
                        onChange={(e) =>
                          setEditValue(e.target.value)
                        }
                        fullWidth
                        multiline
                        rows={3}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                          },
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <Button
                          size="small"
                          startIcon={<X size={16} />}
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<Check size={16} />}
                          onClick={() => handleSaveEdit(entry)}
                        >
                          Save
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#6e6e73",
                      }}
                    >
                      {entry.description}
                    </Typography>
                  )}
                    </Paper>
                  ))}
                </Stack>
              </Box>
            );
          })}
          
        </Stack>
      )}
      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete entry?</DialogTitle>
        <DialogContent>
          <Typography>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EntryList;
