import { getDocument } from 'pdfjs-dist';

export const convertPdfToImage = async (pdfBytes) => {
  const loadingTask = getDocument({ data: pdfBytes });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  
  const scale = 4.0;
  const viewport = page.getViewport({ scale });
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  await page.render({
    canvasContext: context,
    viewport: viewport,
    background: 'white'
  }).promise;
  
  const regions = [
    {
      x: 0,
      y: viewport.height * 0.15,
      width: viewport.width * 0.5,
      height: viewport.height * 0.2
    },
    {
      x: 0,
      y: viewport.height * 0.1,
      width: viewport.width * 0.6,
      height: viewport.height * 0.3
    }
  ];
  
  const processRegion = (region) => {
    const regionCanvas = document.createElement('canvas');
    regionCanvas.width = region.width;
    regionCanvas.height = region.height;
    const regionContext = regionCanvas.getContext('2d');
    
    regionContext.drawImage(
      canvas,
      region.x, region.y, region.width, region.height,
      0, 0, region.width, region.height
    );
    
    const imageData = regionContext.getImageData(0, 0, region.width, region.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const threshold = 160;
      const value = avg > threshold ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
      data[i + 3] = 255;
    }
    
    regionContext.putImageData(imageData, 0, 0);
    return regionCanvas.toDataURL('image/png', 1.0);
  };
  
  return {
    regions: regions.map(processRegion),
    fullImage: canvas.toDataURL('image/png', 1.0)
  };
}; 