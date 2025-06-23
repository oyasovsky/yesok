// When deployed on Firebase the API routes are served by the "api" Cloud
// Function. During development `REACT_APP_API` can point to the emulator
// endpoint (e.g. http://localhost:5001/<project>/us-central1/api).
const API_BASE = process.env.REACT_APP_API || '/api';

export async function getIncidents() {
  const res = await fetch(`${API_BASE}/incidents`);
  return res.json();
}

export async function startIncident() {
  const res = await fetch(`${API_BASE}/incident/start`, { method: 'POST' });
  return res.json();
}

export async function getIncidentStatus(id) {
  const res = await fetch(`${API_BASE}/incident/status/${id}`);
  return res.json();
}

export async function markSafe(incidentId, userId) {
  const res = await fetch(`${API_BASE}/incident/mark-safe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ incidentId, userId })
  });
  return res.json();
}
