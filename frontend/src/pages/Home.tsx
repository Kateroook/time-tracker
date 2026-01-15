import React, { useEffect, useState } from "react";
import { fetchEntries, createEntry } from "../api/entries";
import type { TimeEntry } from "../types/entry";
import TimeEntryForm from "../components/TimeEntryForm";

const Home: React.FC = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadEntries();
  }, []);

const handleEntryCreated = (entry: TimeEntry) => {
    setEntries([entry, ...entries]);
};

  return (
    <div>
      <h2>Mini Time Tracker</h2>
      <TimeEntryForm onEntryCreated={handleEntryCreated} />
      {loading && <p>Loading...</p>}
      <ul>
        {entries.map((e) => (
          <li key={e.id}>
            {e.date} | {e.project} | {e.hours}h | {e.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
