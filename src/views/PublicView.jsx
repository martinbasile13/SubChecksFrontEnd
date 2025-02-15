import { PaymentsTable } from "../components/PaymentsTable/PaymentsTable";
import { BalancesTable } from "../components/BalancesTable/BalancesTable";
import { SpotifyPaymentsTable } from "../components/SpotifyPaymentsTable/SpotifyPaymentsTable";

export function PublicView() {
  console.log('Rendering PublicView'); // Debug log

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        <div className="w-full">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-xl h-8">Saldos Actuales</h2>
              <BalancesTable />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/5">
            <div className="card h-full">
              <div className="card-body">
                <h2 className="card-title text-xl h-8">Historial de Pagos</h2>
                <PaymentsTable isAdmin={false} />
              </div>
            </div>
          </div>
          <div className="lg:w-2/5">
            <div className="card h-full">
              <div className="card-body">
                <h2 className="card-title text-xl h-8">Historial Spotify</h2>
                <SpotifyPaymentsTable isAdmin={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 