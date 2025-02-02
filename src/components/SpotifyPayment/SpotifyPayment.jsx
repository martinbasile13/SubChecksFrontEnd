import { useState } from "react";
import { sendSpotifyPayment } from "../../services/apiService";

export function SpotifyPayment() {
  const [montoSpotify, setMontoSpotify] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const enviarPagoSpotify = async () => {
    if (!montoSpotify) {
      setError("Por favor, ingresa un monto para Spotify");
      return;
    }

    try {
      setEnviando(true);
      setError(null);
      await sendSpotifyPayment(montoSpotify);
      alert('Pago de Spotify enviado exitosamente');
      setMontoSpotify("");
    } catch (error) {
      setError(error.response?.data?.message || 'Error al enviar el pago de Spotify');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="card bg-base-200 shadow-xl shadow-green-500">
      <div className="card-body">
        <h2 className="card-title">Pago a Spotify</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Monto a pagar</span>
          </label>
          <input
            type="text"
            value={montoSpotify}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d.]/g, '');
              if (value.split('.').length <= 2) {
                setMontoSpotify(value);
              }
            }}
            placeholder="Ingresa el monto"
            className="input input-bordered"
          />
        </div>
        
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        
        <button 
          onClick={enviarPagoSpotify}
          disabled={enviando || !montoSpotify}
          className="btn btn-success"
        >
          {enviando ? 
            <span className="loading loading-spinner"></span> : 
            'Enviar Pago Spotify'
          }
        </button>
      </div>
    </div>
  );
} 