import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AdminsView } from './views/AdminsView';
import { PublicView } from './views/PublicView';

function App() {
  return (
    <Router>
      <div className="app">

        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/admins" element={<AdminsView />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-2xl">Página no encontrada 404</h1>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

