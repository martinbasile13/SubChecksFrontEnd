import Tesseract from "tesseract.js";
import * as pdfjsLib from 'pdfjs-dist';
import { convertPdfToImage } from '../utils/imageProcessing';

const { getDocument } = pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const processPdf = async (file) => {
  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const pdfBytes = new Uint8Array(reader.result);
        const { regions, fullImage } = await convertPdfToImage(pdfBytes);
        
        let montoValue = "No encontrado";
        
        for (const regionImage of regions) {
          const result = await Tesseract.recognize(regionImage, "spa", {
            tessedit_pageseg_mode: '6',
            tessedit_char_whitelist: '0123456789.,$',
            tessjs_create_hocr: '1'
          });
          
          console.log('Texto extraído:', result.data.text);
          
          const montoPattern = /\$\s*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)/;
          const lines = result.data.text.split('\n');
          
          for (const line of lines) {
            console.log('Línea analizada:', line);
            if (line.includes('$')) {
              console.log('Línea con $:', line);
              const match = line.match(montoPattern);
              if (match) {
                console.log('Match encontrado:', match);
                const montoCompleto = match[0];
                console.log('Monto completo extraído:', montoCompleto);
                if (!line.includes('de')) {
                  montoValue = montoCompleto;
                  console.log("Monto final seleccionado:", montoValue);
                  break;
                }
              }
            }
          }
          
          if (montoValue !== "No encontrado") break;
        }
        
        const fullResult = await Tesseract.recognize(fullImage, "spa", {
          logger: m => console.log(m),
        });
        
        const remitenteMatch = fullResult.data.text.match(/De\n(.*?)\nCUIT/);
        const remitenteValue = remitenteMatch ? remitenteMatch[1].trim() : "No encontrado";
        
        resolve({
          monto: montoValue,
          remitente: remitenteValue
        });
      } catch (err) {
        console.error("Error en processPdf:", err);
        reject(err);
      }
    };
    
    reader.readAsArrayBuffer(file);
  });
}; 