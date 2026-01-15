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
      className="ds-card ds-p-card ds-w-full"
      sx={{ mt: 5 }}
    >
      {/* Header */}
      <Box className="ds-header">
        <Typography
          variant="h4"
          className="ds-heading ds-heading-md-sm"
        >
          History
        </Typography>

        <Box className="ds-badge">
          Total: {grandTotal.toFixed(2)} hrs
        </Box>
      </Box>

      {/* Empty state */}
      {sortedDates.length === 0 ? (
        <Box className="ds-empty-state">
          <Typography className="ds-mt-2 ds-h5">
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
                <Box className="ds-subheader">
                  <Typography
                      className="ds-text-bold ds-h5 ds-tracking-tight"
                  >
                    {formatDate(dateKey)}
                  </Typography>

                  <Typography
                      className="ds-text-muted ds-text-semibold ds-text-sm"
                  >
                    {dayTotal.toFixed(2)} hrs
                  </Typography>
                </Box>

                <Divider sx={{ marginBottom: "var(--space-4)" }} />

                {/* Entries */}
                <Stack spacing={1.5}>
                  {dayEntries.map((entry) => (
                    <Paper
                      key={entry.id}
                      elevation={0}
                      className="ds-card-item"
                      sx={{ p: 2.5, borderRadius: "var(--radius-xl)" }}
                    >
                      <Box className="ds-flex-between ds-gap-2" sx={{ mb: 0.75 }}>
                        <Typography className="ds-text-bold ds-text-body">
                          {entry.project}
                        </Typography>
                        <Box className="ds-flex-row ds-gap-1" sx={{ alignItems: "center" }}>
                          <Typography
                              className="ds-text-bold ds-text-sm ds-whitespace-nowrap"
                              sx={{ color: "var(--color-primary)" }}
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
                            borderRadius: "var(--radius-xl)",
                          },
                        }}
                      />

                      <Box
                        className="ds-flex-row"
                        sx={{ justifyContent: "flex-end", gap: "var(--space-2)", marginTop: "var(--space-2)" }}
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
                    <Typography className="ds-text-body">
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
