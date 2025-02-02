import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminsView } from './views/AdminsView';
import { PublicView } from './views/PublicView';
import { PdfProcessor } from "./components/PdfProcessor/PdfProcessor";
import { SpotifyPayment } from "./components/SpotifyPayment/SpotifyPayment";
import { PaymentsTable } from "./components/PaymentsTable/PaymentsTable";
import { BalancesTable } from "./components/BalancesTable/BalancesTable";
import { SpotifyPaymentsTable } from "./components/SpotifyPaymentsTable/SpotifyPaymentsTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/admins" element={<AdminsView />} />
      </Routes>
    </Router>
  );
}

export default App;

