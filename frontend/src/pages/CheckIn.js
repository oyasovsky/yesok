import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIncidentStatus, markSafe } from '../api';

export default function CheckIn() {
  const { incidentId } = useParams();
  const [teams, setTeams] = useState([]);
  const [nameSearch, setNameSearch] = useState('');

  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {
    const data = await getIncidentStatus(incidentId);
    setTeams(data.perTeam);
  }

  async function handleMark(userId) {
    await markSafe(incidentId, userId);
    fetchStatus();
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Incident {incidentId}</h1>
      <input
        className="border p-1 mb-2"
        placeholder="Search name"
        value={nameSearch}
        onChange={e => setNameSearch(e.target.value)}
      />
      {teams.map(team => (
        <div key={team.team} className="mb-4">
          <h2 className="font-semibold">{team.team}</h2>
          <ul>
            {team.members
              .filter(m => m.name.toLowerCase().includes(nameSearch.toLowerCase()))
              .map(m => (
                <li key={m.id} className="flex items-center space-x-2">
                  <span>{m.name}</span>
                  {m.safe ? (
                    <span className="text-green-600">Safe</span>
                  ) : (
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleMark(m.id)}
                    >
                      Mark Safe
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
