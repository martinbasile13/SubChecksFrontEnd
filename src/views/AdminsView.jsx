import { PdfProcessor } from "../components/PdfProcessor/PdfProcessor";
import { SpotifyPayment } from "../components/SpotifyPayment/SpotifyPayment";
import { PaymentsTable } from "../components/PaymentsTable/PaymentsTable";
import { BalancesTable } from "../components/BalancesTable/BalancesTable";
import { SpotifyPaymentsTable } from "../components/SpotifyPaymentsTable/SpotifyPaymentsTable";

export function AdminsView() {
  console.log('Rendering AdminsView'); // Debug log

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="flex items-center gap-4 mb-8">
        <img 
          src="/leap-wallet.svg" 
          alt="SubChecks Logo" 
          className="w-12 h-12"
        />
        <h1 className="text-3xl font-bold">SubChecks Admins</h1>
      </div>
      
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="card h-full">
              <div className="card-body">
                <h2 className="card-title text-xl h-8">Procesador de PDF</h2>
                <PdfProcessor />
              </div>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="card h-full">
              <div className="card-body">
                <h2 className="card-title text-xl h-8">Pago a Spotify</h2>
                <SpotifyPayment />
              </div>
            </div>
          </div>
        </div>
        
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
                <PaymentsTable isAdmin={true} />
              </div>
            </div>
          </div>
          <div className="lg:w-2/5">
            <div className="card h-full">
              <div className="card-body">
                <h2 className="card-title text-xl h-8">Historial Spotify</h2>
                <SpotifyPaymentsTable isAdmin={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 