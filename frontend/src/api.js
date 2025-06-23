const API_BASE = process.env.REACT_APP_API || 'http://localhost:4000';

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
