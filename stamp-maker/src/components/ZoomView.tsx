import React, { useEffect, useRef } from 'react';

interface ZoomViewProps {
  zoom: { x: number; y: number };
  updateZoom: (zoom: { x: number; y: number }) => void;
  image: ImageData | null;
}

const ZOOM_SCALE = 10; // Fixed zoom level
const SOURCE_SIZE = 20; // 20x20 pixel area to zoom
const CANVAS_SIZE = 200; // Size of the zoom canvas

/**
 * ZoomView Component - Provides 10x magnification for precise pixel selection
 * 
 * @component
 * @param {Object} props - Component props
 * @param {{ x: number, y: number }} props.zoom - Zoom coordinates (center pixel)
 * @param {Function} props.updateZoom - Function to update zoom coordinates
 * @param {ImageData | null} props.image - Image data to zoom into
 * @returns {JSX.Element} Zoom view component with crosshair and pixel grid
 */
export const ZoomView: React.FC<ZoomViewProps> = ({ zoom, updateZoom, image }) => {
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the zoomed view based on current zoom coordinates
  useEffect(() => {
    const zoomCanvas = zoomCanvasRef.current;
    
    if (!zoomCanvas || !image) {
      return;
    }

    const zoomCtx = zoomCanvas.getContext('2d');
    if (!zoomCtx) return;

    // Clear zoom canvas
    zoomCtx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
    
    // Set up pixelated rendering
    zoomCtx.imageSmoothingEnabled = false;
    
    // Calculate source area (SOURCE_SIZE x SOURCE_SIZE pixels around zoom center)
    const halfSize = Math.floor(SOURCE_SIZE / 2);
    const sourceX = Math.max(0, Math.min(image.width - SOURCE_SIZE, zoom.x - halfSize));
    const sourceY = Math.max(0, Math.min(image.height - SOURCE_SIZE, zoom.y - halfSize));
    
    // Calculate destination area (centered in zoom canvas)
    const destSize = SOURCE_SIZE * ZOOM_SCALE;
    const offsetX = (zoomCanvas.width - destSize) / 2;
    const offsetY = (zoomCanvas.height - destSize) / 2;
    
    try {
      // Extract the source area from the image data
      const sourceImageData = new ImageData(SOURCE_SIZE, SOURCE_SIZE);
      
      for (let y = 0; y < SOURCE_SIZE; y++) {
        for (let x = 0; x < SOURCE_SIZE; x++) {
          const srcX = sourceX + x;
          const srcY = sourceY + y;
          
          // Check bounds
          if (srcX >= 0 && srcX < image.width && srcY >= 0 && srcY < image.height) {
            const srcIndex = (srcY * image.width + srcX) * 4;
            const destIndex = (y * SOURCE_SIZE + x) * 4;
            
            sourceImageData.data[destIndex] = image.data[srcIndex];     // R
            sourceImageData.data[destIndex + 1] = image.data[srcIndex + 1]; // G
            sourceImageData.data[destIndex + 2] = image.data[srcIndex + 2]; // B
            sourceImageData.data[destIndex + 3] = image.data[srcIndex + 3]; // A
          }
        }
      }
      
      // Create temporary canvas for scaling
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = SOURCE_SIZE;
      tempCanvas.height = SOURCE_SIZE;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (tempCtx) {
        tempCtx.putImageData(sourceImageData, 0, 0);
        
        // Draw scaled image to zoom canvas
        zoomCtx.drawImage(
          tempCanvas,
          0, 0, SOURCE_SIZE, SOURCE_SIZE,
          offsetX, offsetY, destSize, destSize
        );
      }
      
      // Draw pixel grid
      zoomCtx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      zoomCtx.lineWidth = 1;
      
      // Vertical grid lines
      for (let i = 0; i <= SOURCE_SIZE; i++) {
        const pos = offsetX + i * ZOOM_SCALE;
        zoomCtx.beginPath();
        zoomCtx.moveTo(pos, offsetY);
        zoomCtx.lineTo(pos, offsetY + destSize);
        zoomCtx.stroke();
      }
      
      // Horizontal grid lines
      for (let i = 0; i <= SOURCE_SIZE; i++) {
        const pos = offsetY + i * ZOOM_SCALE;
        zoomCtx.beginPath();
        zoomCtx.moveTo(offsetX, pos);
        zoomCtx.lineTo(offsetX + destSize, pos);
        zoomCtx.stroke();
      }
      
      // Draw crosshair at center
      const centerX = zoomCanvas.width / 2;
      const centerY = zoomCanvas.height / 2;
      
      zoomCtx.strokeStyle = 'red';
      zoomCtx.lineWidth = 2;
      zoomCtx.beginPath();
      zoomCtx.moveTo(centerX - 10, centerY);
      zoomCtx.lineTo(centerX + 10, centerY);
      zoomCtx.moveTo(centerX, centerY - 10);
      zoomCtx.lineTo(centerX, centerY + 10);
      zoomCtx.stroke();
      
      // Draw pixel coordinates
      zoomCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      zoomCtx.fillRect(5, 5, 80, 20);
      zoomCtx.fillStyle = 'white';
      zoomCtx.font = '12px monospace';
      zoomCtx.fillText(`${zoom.x}, ${zoom.y}`, 10, 18);
      
    } catch (error) {
      console.warn('Error updating zoom view:', error);
    }
  }, [zoom, image]);

  return (
    <div className="zoom-container">
      <div className="zoom-view">
        <canvas 
          ref={zoomCanvasRef}
          className="zoom-canvas"
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{ 
            border: '1px solid #999',
            display: 'block'
          }}
          aria-label="Zoom view showing magnified area around cursor"
        />
      </div>
    </div>
  );
};
