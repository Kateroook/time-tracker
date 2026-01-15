import React, { useState } from "react";
import { createEntry } from "../api/entries";
import type { TimeEntry } from "../types/entry";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
  Alert,
  Fade,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  onEntryCreated: (entry: TimeEntry) => void;
}

const PROJECTS = [
  "Viso Internal",
  "Client A",
  "Client B",
  "Personal Development",
];
const TimeEntryForm: React.FC<Props> = ({ onEntryCreated }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [project, setProject] = useState(PROJECTS[0]);
  const [hours, setHours] = useState<number | "">(1);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    date: false,
    project: false,
    hours: false,
    description: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateHours = (value: number | "") => {
    if (value === "" || value <= 0 || value > 24) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess(false);

    const newErrors = {
      date: !date,
      project: !project,
      hours: !validateHours(hours),
      description: !description.trim(),
    };
    setFieldErrors(newErrors);

    if (Object.values(newErrors).some((v) => v)) return;

    try {
      setLoading(true);
      const entry = await createEntry({
        date: date!.toISOString(),
        project,
        hours: Number(hours),
        description,
      });
      
      if (onEntryCreated) {
        onEntryCreated(entry);
      }

      setSuccess(true);
      setDescription("");
      setHours(1);
      setDate(dayjs());
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyles = {
    borderRadius: "var(--radius-xl)",

    "& .MuiOutlinedInput-root": {
      borderRadius: "var(--radius-xl)",
      backgroundColor: "var(--color-surface)",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "var(--color-surface-variant)",
      },
      "&.Mui-focused": {
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--shadow-focus)",
      },
       "&.Mui-error": { 
         backgroundColor: "var(--color-danger-surface)", 
         boxShadow: "var(--shadow-focus-error)", 
         borderColor: "var(--color-danger)", 
      },
    },
  };

  return (
    <Box className="ds-card ds-p-card">
      <Box className="ds-header">
        <Typography 
          variant="h4" 
          className="ds-heading ds-h3"
        >
          New Time Entry
        </Typography>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2}
          >
            <Box sx={{ flex: 1 }}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  setFieldErrors((prev) => ({ ...prev, date: false }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: fieldErrors.date,
                    helperText: fieldErrors.date ? "Date is required" : "",
                    sx: fieldStyles,
                  },
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <TextField
                label="Project"
                select
                value={project}
                fullWidth
                onChange={(e) => {
                  setProject(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, project: false }));
                }}
                error={fieldErrors.project}
                helperText={fieldErrors.project ? "Project is required" : ""}
                sx={fieldStyles}
              >
                {PROJECTS.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ flex: { xs: 1, sm: 0.7 } }}>
              <TextField
                label="Hours"
                type="number"
                value={hours}
                onChange={(e) => {
                  const val = e.target.value;
                  const numVal = val === "" ? "" : Number(val);
                  setHours(numVal);
                  setFieldErrors((prev) => ({ 
                    ...prev, 
                    hours: !validateHours(numVal)
                  }));
                }}
                fullWidth
                inputProps={{ min: 0.25, max: 24, step: 0.25 }}
                error={fieldErrors.hours}
                helperText={
                  fieldErrors.hours 
                    ? "0.25 - 24 hrs" 
                    : ""
                }
                sx={fieldStyles}
              />
            </Box>
          </Stack>

          {/* Row 2: Description */}
          <TextField
            label="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setFieldErrors((prev) => ({ ...prev, description: false }));
            }}
            fullWidth
            multiline
            rows={4}
            error={fieldErrors.description}
            helperText={fieldErrors.description ? "Description is required" : ""}
            sx={fieldStyles}
          />

          {/* Alerts */}
          {error && (
            <Fade in={!!error}>
              <div className="ds-alert ds-alert--error">
                {error}
              </div>
            </Fade>
          )}

          {success && (
            <Fade in={success}>
              <div className="ds-alert ds-alert--success">
                Time entry saved successfully!
              </div>
            </Fade>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            className="ds-btn ds-btn-primary"
          >
            {loading ? "Saving..." : "Save Entry"}
          </Button>
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};
export default TimeEntryForm;
