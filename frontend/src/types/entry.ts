export interface TimeEntry {
  id: number;
  date: string; // ISO string
  project: string;
  hours: number;
  description: string;
  createdAt: string;
}