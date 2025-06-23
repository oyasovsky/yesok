import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getIncidents } from '../api';

export default function Home() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  async function fetchIncidents() {
    const data = await getIncidents();
    setIncidents(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Incidents</h1>
      <ul className="space-y-2">
        {incidents.map(i => (
          <li key={i.id} className="p-2 border rounded">
            <Link to={`/checkin/${i.id}`}>Incident {i.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
