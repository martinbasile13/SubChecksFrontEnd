import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminsView } from './views/AdminsView';
import { PublicView } from './views/PublicView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/admins" element={<AdminsView />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl">Página no encontrada</h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;

