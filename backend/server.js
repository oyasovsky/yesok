const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'teams.json');
let teams = JSON.parse(fs.readFileSync(dataPath));

const incidents = {}; // in-memory incidents

const app = express();
app.use(cors());
app.use(express.json());

app.get('/incidents', (req, res) => {
  const list = Object.values(incidents).map(i => ({ id: i.id, started: i.started }));
  res.json(list);
});

app.get('/teams', (req, res) => {
  res.json(teams);
});

app.post('/incident/start', (req, res) => {
  const id = uuidv4();
  const status = {};
  teams.teams.forEach(team => {
    team.members.forEach(member => {
      status[member.id] = false; // not safe yet
    });
  });
  incidents[id] = { id, started: Date.now(), status };
  res.json({ id });
});

app.get('/incident/status/:id', (req, res) => {
  const incident = incidents[req.params.id];
  if (!incident) return res.status(404).json({ error: 'Not found' });
  const perTeam = teams.teams.map(team => {
    const members = team.members.map(m => ({ ...m, safe: !!incident.status[m.id] }));
    const safe = members.filter(m => m.safe).length;
    return { team: team.name, members, safe, total: members.length };
  });
  res.json({ id: incident.id, started: incident.started, perTeam });
});

app.post('/incident/mark-safe', (req, res) => {
  const { incidentId, userId } = req.body;
  const incident = incidents[incidentId];
  if (!incident) return res.status(404).json({ error: 'Incident not found' });
  if (incident.status[userId] === undefined) {
    return res.status(400).json({ error: 'User not found' });
  }
  incident.status[userId] = true;
  res.json({ success: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
