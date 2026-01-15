import React, { useEffect, useState } from "react";
import { fetchEntries, createEntry } from "../api/entries";
import type { TimeEntry } from "../types/entry";

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

  const addDummyEntry = async () => {
    try {
      const entry = await createEntry({
        date: new Date().toISOString(),
        project: "Client A",
        hours: 2,
        description: "Test entry from frontend",
      });
      alert("Created entry with ID " + entry.id);
      loadEntries(); // refresh list
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div>
      <h2>Mini Time Tracker</h2>
      <button onClick={addDummyEntry}>Add Dummy Entry</button>
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
