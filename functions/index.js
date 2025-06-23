const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Get list of incidents
app.get('/incidents', async (req, res) => {
  const snapshot = await db.collection('incidents').get();
  const list = snapshot.docs.map(doc => ({ id: doc.id, started: doc.data().started }));
  res.json(list);
});

// List teams
app.get('/teams', async (req, res) => {
  const snapshot = await db.collection('teams').get();
  const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json({ teams });
});

// Start a new incident
app.post('/incident/start', async (req, res) => {
  const teamsSnap = await db.collection('teams').get();
  const status = {};
  teamsSnap.forEach(teamDoc => {
    const members = teamDoc.data().members || [];
    members.forEach(member => {
      status[member.id] = false;
    });
  });
  const id = uuidv4();
  await db.collection('incidents').doc(id).set({ started: Date.now(), status });
  res.json({ id });
});

// Get incident status
app.get('/incident/status/:id', async (req, res) => {
  const incidentDoc = await db.collection('incidents').doc(req.params.id).get();
  if (!incidentDoc.exists) return res.status(404).json({ error: 'Not found' });
  const incident = incidentDoc.data();
  const teamsSnap = await db.collection('teams').get();
  const perTeam = teamsSnap.docs.map(doc => {
    const members = (doc.data().members || []).map(m => ({
      ...m,
      safe: !!incident.status[m.id]
    }));
    const safe = members.filter(m => m.safe).length;
    return { team: doc.data().name, members, safe, total: members.length };
  });
  res.json({ id: req.params.id, started: incident.started, perTeam });
});

// Mark a user safe
app.post('/incident/mark-safe', async (req, res) => {
  const { incidentId, userId } = req.body;
  const ref = db.collection('incidents').doc(incidentId);
  const doc = await ref.get();
  if (!doc.exists) return res.status(404).json({ error: 'Incident not found' });
  const data = doc.data();
  if (!(userId in data.status)) return res.status(400).json({ error: 'User not found' });
  data.status[userId] = true;
  await ref.update({ status: data.status });
  res.json({ success: true });
});

exports.api = functions.https.onRequest(app);
