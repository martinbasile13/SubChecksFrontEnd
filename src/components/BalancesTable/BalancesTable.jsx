import { useState, useEffect } from "react";
import { getAllBalances } from "../../services/apiService";

export function BalancesTable() {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalances = async () => {
    try {
      setLoading(true);
      const data = await getAllBalances();
      setBalances(data);
    } catch (err) {
      setError('Error al cargar los saldos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  return (
    <div className="card bg-base-200 shadow-xl shadow-green-500">
      <div className="card-body">
        <h2 className="card-title">Saldos</h2>

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-xs sm:text-sm md:text-base lg:text-lg">ID</th>
                  <th className="text-xs sm:text-sm md:text-base lg:text-lg">Remitente</th>
                  <th className="text-xs sm:text-sm md:text-base lg:text-lg">Monto</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((balance) => (
                  <tr key={balance.id}>
                    <td className="text-xs sm:text-sm md:text-base lg:text-lg">{balance.id}</td>
                    <td className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-normal break-words">
                      {balance.remitente}
                    </td>
                    <td className={`text-xs sm:text-sm md:text-base lg:text-lg ${
                      parseFloat(balance.monto) < 0 ? 'text-error' : 'text-success'
                    }`}>
                      ${new Intl.NumberFormat('es-AR').format(balance.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 