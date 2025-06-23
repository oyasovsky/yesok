import React, { useEffect, useState } from 'react';
import { getIncidents, startIncident, getIncidentStatus } from '../api';

export default function Admin() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const data = await getIncidents();
    setIncidents(data);
  }

  async function handleStart() {
    await startIncident();
    refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleStart}>
        Start Incident
      </button>
      <h2 className="mt-4 font-semibold">Existing Incidents</h2>
      <ul className="space-y-2">
        {incidents.map(i => (
          <li key={i.id} className="p-2 border rounded">
            ID: {i.id} Started: {new Date(i.started).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
