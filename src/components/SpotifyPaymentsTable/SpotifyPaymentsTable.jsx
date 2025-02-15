import { useState, useEffect } from "react";
import { getSpotifyPayments, deleteSpotifyPayment } from "../../services/apiService";

export function SpotifyPaymentsTable({ isAdmin }) {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getSpotifyPayments();
      setPayments(data);
    } catch (err) {
      setError('Error al cargar los pagos de Spotify');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pago de Spotify?')) {
      try {
        await deleteSpotifyPayment(id);
        await fetchPayments();
      } catch (err) {
        setError('Error al eliminar el pago de Spotify');
      }
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="card bg-base-200 shadow-xl shadow-green-500">
      <div className="card-body">
        <h2 className="card-title">Pagos de Spotify</h2>
        
        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">Registros por página</span>
          </label>
          <select 
            className="select select-bordered"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset a la primera página cuando cambia el límite
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

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
                  <th className="text-xs sm:text-sm md:text-base lg:text-lg">Monto</th>
                  <th className="text-xs sm:text-sm md:text-base lg:text-lg">Fecha</th>
                  {isAdmin && <th className="text-xs sm:text-sm md:text-base lg:text-lg">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((payment) => (
                  <tr key={payment.id}>
                    <td className="text-xs sm:text-sm md:text-base lg:text-lg">{payment.id}</td>
                    <td className="text-xs sm:text-sm md:text-base lg:text-lg text-success">
                      ${new Intl.NumberFormat('es-AR').format(payment.pagospotify)}
                    </td>
                    <td className="text-xs sm:text-sm md:text-base lg:text-lg">
                      {new Date(payment.fecha).toLocaleDateString()}
                    </td>
                    {isAdmin && (
                      <td>
                        <button 
                          className="btn btn-error btn-xs sm:btn-sm md:btn-md"
                          onClick={() => handleDelete(payment.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="join grid grid-cols-2 mt-4">
          <button 
            className="join-item btn btn-outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button 
            className="join-item btn btn-outline"
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={indexOfLastItem >= payments.length}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
} 