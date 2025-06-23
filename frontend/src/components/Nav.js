import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ dark, toggleDark }) {
  return (
    <nav className="bg-blue-500 text-white p-4 flex space-x-4 items-center">
      <Link to="/" className="font-bold">Dashboard</Link>
      <Link to="/admin">Admin</Link>
      <button className="ml-auto underline" onClick={toggleDark}>
        {dark ? 'Light' : 'Dark'} Mode
      </button>
    </nav>
  );
}
