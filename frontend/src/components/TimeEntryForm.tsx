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
    borderRadius: "12px", 

    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fff",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#fafafa",
      },
      "&.Mui-focused": {
        backgroundColor: "#fff",
        boxShadow: "0 0 0 4px rgba(0, 122, 255, 0.1)",
      },
      "&.Mui-error": {
        backgroundColor: "#fff5f5",
        boxShadow: "0 0 0 4px rgba(255, 59, 48, 0.1)",
        borderColor: "#ff3b30",
      },
    },
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
        borderRadius: "20px",
        padding: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 600,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          color: "#1d1d1f",
          letterSpacing: "-0.02em",
        }}
      >
        New Time Entry
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
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

            <Box sx={{ flex: 1, minWidth: 0 }}>
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

            <Box sx={{ flex: { xs: 1, sm: 0.7 }, minWidth: 0 }}>
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
              <Alert 
                severity="error"
                sx={{ 
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 59, 48, 0.2)",
                }}
              >
                {error}
              </Alert>
            </Fade>
          )}

          {success && (
            <Fade in={success}>
              <Alert 
                severity="success"
                sx={{ 
                  borderRadius: "12px",
                  border: "1px solid rgba(52, 199, 89, 0.2)",
                }}
              >
                Time entry saved successfully!
              </Alert>
            </Fade>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            sx={{
              borderRadius: "12px",
              padding: "14px 24px",
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#007aff",
              boxShadow: "0 2px 8px rgba(0, 122, 255, 0.3)",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#0051d5",
                boxShadow: "0 4px 16px rgba(0, 122, 255, 0.4)",
                transform: "translateY(-1px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#e5e5ea",
                color: "#8e8e93",
              },
            }}
          >
            {loading ? "Saving..." : "Save Entry"}
          </Button>
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};
export default TimeEntryForm;
