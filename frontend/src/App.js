import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';

export default function App({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Nav dark={dark} toggleDark={() => setDark(!dark)} />
      <div className="p-4">{children}</div>
    </div>
  );
}
