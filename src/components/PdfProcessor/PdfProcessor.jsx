import { useState } from "react";
import { processPdf } from "../../services/pdfService";
import { sendPaymentData } from "../../services/apiService";

export function PdfProcessor() {
  const [file, setFile] = useState(null);
  const [monto, setMonto] = useState("No encontrado");
  const [remitente, setRemitente] = useState("No encontrado");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsLoading(true);
      setError(null);
      try {
        const result = await processPdf(selectedFile);
        setMonto(result.monto);
        setRemitente(result.remitente);
      } catch (err) {
        setError("Error al procesar el PDF");
        setMonto("No encontrado");
        setRemitente("No encontrado");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const enviarDatos = async () => {
    if (monto === "No encontrado" || remitente === "No encontrado") {
      setError("No hay datos válidos para enviar");
      return;
    }

    try {
      setEnviando(true);
      setError(null);
      await sendPaymentData({
        remitente,
        monto
      });
      // Limpiar el formulario después de enviar
      setFile(null);
      setMonto("No encontrado");
      setRemitente("No encontrado");
    } catch (err) {
      setError("Error al enviar los datos al servidor");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="form-control">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
          disabled={isLoading || enviando}
        />
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Monto</div>
          <div className="stat-value">{monto}</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Remitente</div>
          <div className="stat-value">{remitente}</div>
        </div>
      </div>
      
      <button 
        onClick={enviarDatos}
        disabled={enviando || monto === "No encontrado" || remitente === "No encontrado"}
        className="btn btn-success"
      >
        {enviando ? 
          <span className="loading loading-spinner"></span> : 
          'Enviar al Servidor'
        }
      </button>
    </div>
  );
} 