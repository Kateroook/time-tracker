import axios from "axios";
import type { TimeEntry } from "../types/entry";

const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchEntries = async (): Promise<TimeEntry[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createEntry = async (entry: Omit<TimeEntry, "id" | "createdAt">) => {
  const res = await axios.post(API_BASE, entry);
  return res.data;
};

export const updateEntry = async (id: number, description: string) => {
  const res = await axios.patch(`${API_BASE}/${id}`, { description });
  return res.data;
};

export const deleteEntry = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
