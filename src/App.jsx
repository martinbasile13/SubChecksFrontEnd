import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AdminsView } from './views/AdminsView';
import { PublicView } from './views/PublicView';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <img 
              src="/leap-wallet.svg" 
              alt="SubChecks Logo" 
              className="w-12 h-12"
            />
            <h1 className="text-3xl font-bold">SubChecks</h1>
          </div>
          <button 
            className="btn btn-circle btn-ghost text-xl"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/admins" element={<AdminsView />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-2xl">Página no encontrada</h1>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

