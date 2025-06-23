import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import Admin from './pages/Admin';

const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin/:incidentId" element={<CheckIn />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </App>
  </Router>
);
