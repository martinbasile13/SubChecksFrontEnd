import axios from 'axios';

export const API_BASE_URL = 'https://subchecksbackend-production.up.railway.app/api';

// Rutas específicas
const HISTORIAL_URL = `${API_BASE_URL}/historial`;
const SALDOS_URL = `${API_BASE_URL}/saldos`;
const SPOTIFY_URL = `${API_BASE_URL}/pagospotify`;
const PROCESS_SALDOS_URL = `${API_BASE_URL}/process-saldos`;


export const getAllPayments = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${HISTORIAL_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error getting payments:', error);
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    const response = await axios.delete(`${HISTORIAL_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
};

export const getAllBalances = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${SALDOS_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error getting balances:', error);
    throw error;
  }
};

export const getSpotifyPayments = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${SPOTIFY_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error getting Spotify payments:', error);
    throw error;
  }
};

export const deleteSpotifyPayment = async (id) => {
  try {
    const response = await axios.delete(`${SPOTIFY_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Spotify payment:', error);
    throw error;
  }
};

export const sendPaymentData = async (data) => {
  try {
    // Función para limpiar y convertir el monto manteniendo los centavos
    const cleanAmount = (amount) => {
      // Eliminar el símbolo $ y espacios
      let cleanedAmount = amount.replace('$', '').trim();
      
      // Si el número tiene formato con punto para miles y coma para centavos (3.861,00)
      if (cleanedAmount.includes('.') || cleanedAmount.includes(',')) {
        // Guardamos los centavos si existen
        const parts = cleanedAmount.split(',');
        const wholeNumber = parts[0].replace(/\./g, ''); // Eliminar puntos de miles
        const cents = parts[1] || '00'; // Si no hay centavos, usar '00'
        
        // Combinar el número entero con los centavos
        cleanedAmount = `${wholeNumber}.${cents}`;
      }

      return parseFloat(cleanedAmount);
    };

    console.log('Monto original:', data.monto);
    const montoLimpio = cleanAmount(data.monto);
    console.log('Monto procesado:', montoLimpio);

    const formattedData = {
      remitente: data.remitente,
      monto: montoLimpio,
      tipo: 'normal'
    };
    
    console.log('Enviando datos al servidor:', formattedData);
    const response = await axios.post(PROCESS_SALDOS_URL, formattedData);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error detallado en sendPaymentData:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      data: JSON.stringify(error.response?.config?.data)
    });
    throw error;
  }
};

export const sendSpotifyPayment = async (monto) => {
  try {
    // Asegurarnos de que el monto sea un número
    const montoLimpio = parseFloat(monto.toString().replace(/[$ ,]/g, ''));
    
    const data = {
      monto: montoLimpio
    };
    
    console.log('Enviando pago Spotify:', data);
    const response = await axios.post(SPOTIFY_URL, data);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error detallado en sendSpotifyPayment:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      data: JSON.stringify(error.response?.config?.data)
    });
    
    if (error.response?.status === 400) {
      throw new Error('Datos de pago inválidos. Verifique el monto ingresado.');
    } else if (error.response?.status === 500) {
      throw new Error('Error en el servidor. Por favor, intente más tarde.');
    } else {
      throw new Error('Error al procesar el pago de Spotify. Por favor, intente nuevamente.');
    }
  }
}; 