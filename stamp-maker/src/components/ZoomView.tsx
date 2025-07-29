import React, { useCallback, useEffect, useRef } from 'react';

interface ZoomViewProps {
  appState: any;
  updateAppState: (updates: any) => void;
}

/**
 * ZoomView Component - Provides 5x magnification for precise pixel selection
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.appState - Application state object
 * @param {Function} props.updateAppState - Function to update application state
 * @returns {JSX.Element} Zoom view component with crosshair and pixel grid
 */
export const ZoomView: React.FC<ZoomViewProps> = ({ appState, updateAppState }) => {
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Update zoom view based on mouse position
  const updateZoomView = useCallback((x: number, y: number) => {
    const zoomCanvas = zoomCanvasRef.current;
    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    
    if (!zoomCanvas || !mainCanvas || !appState.image.original) {
      return;
    }

    const zoomCtx = zoomCanvas.getContext('2d');
    const mainCtx = mainCanvas.getContext('2d');
    
    if (!zoomCtx || !mainCtx) {
      return;
    }

    // Clear zoom canvas
    zoomCtx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
    
    // Set up pixelated rendering
    zoomCtx.imageSmoothingEnabled = false;
    
    // Calculate source area (20x20 pixels around cursor)
    const sourceSize = 20;
    const sourceX = Math.max(0, Math.min(mainCanvas.width - sourceSize, x - sourceSize / 2));
    const sourceY = Math.max(0, Math.min(mainCanvas.height - sourceSize, y - sourceSize / 2));
    
    // Draw magnified area
    const scale = appState.ui.zoom.scale;
    const destSize = sourceSize * scale;
    const offsetX = (zoomCanvas.width - destSize) / 2;
    const offsetY = (zoomCanvas.height - destSize) / 2;
    
    try {
      // Get image data from main canvas
      const imageData = mainCtx.getImageData(sourceX, sourceY, sourceSize, sourceSize);
      
      // Create temporary canvas for scaling
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = sourceSize;
      tempCanvas.height = sourceSize;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (tempCtx) {
        tempCtx.putImageData(imageData, 0, 0);
        
        // Draw scaled image to zoom canvas
        zoomCtx.drawImage(
          tempCanvas,
          0, 0, sourceSize, sourceSize,
          offsetX, offsetY, destSize, destSize
        );
      }
      
      // Draw pixel grid
      zoomCtx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      zoomCtx.lineWidth = 1;
      
      for (let i = 0; i <= sourceSize; i++) {
        const pos = offsetX + i * scale;
        zoomCtx.beginPath();
        zoomCtx.moveTo(pos, offsetY);
        zoomCtx.lineTo(pos, offsetY + destSize);
        zoomCtx.stroke();
      }
      
      for (let i = 0; i <= sourceSize; i++) {
        const pos = offsetY + i * scale;
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
      zoomCtx.fillText(`${x}, ${y}`, 10, 18);
      
    } catch (error) {
      console.warn('Error updating zoom view:', error);
    }
  }, [appState.image.original, appState.ui.zoom.scale]);

  // Handle mouse move on main canvas
  const handleMainCanvasMouseMove = useCallback((event: MouseEvent) => {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    
    // Update zoom state
    updateAppState({
      ui: {
        ...appState.ui,
        zoom: {
          ...appState.ui.zoom,
          x,
          y
        }
      }
    });
    
    // Cancel previous animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Update zoom view on next frame
    animationFrameRef.current = requestAnimationFrame(() => {
      updateZoomView(x, y);
    });
  }, [appState.ui, updateAppState, updateZoomView]);

  // Handle mouse leave main canvas
  const handleMainCanvasMouseLeave = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Clear zoom canvas
    const zoomCanvas = zoomCanvasRef.current;
    if (zoomCanvas) {
      const ctx = zoomCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
      }
    }
  }, []);

  // Set up event listeners
  useEffect(() => {
    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    
    if (mainCanvas) {
      mainCanvas.addEventListener('mousemove', handleMainCanvasMouseMove);
      mainCanvas.addEventListener('mouseleave', handleMainCanvasMouseLeave);
      
      return () => {
        mainCanvas.removeEventListener('mousemove', handleMainCanvasMouseMove);
        mainCanvas.removeEventListener('mouseleave', handleMainCanvasMouseLeave);
      };
    }
  }, [handleMainCanvasMouseMove, handleMainCanvasMouseLeave]);

  // Change zoom scale
  const changeZoomScale = useCallback((newScale: number) => {
    updateAppState({
      ui: {
        ...appState.ui,
        zoom: {
          ...appState.ui.zoom,
          scale: Math.max(2, Math.min(10, newScale))
        }
      }
    });
  }, [appState.ui.zoom, appState.ui, updateAppState]);

  const hasImage = appState.image.original !== null;

  return (
    <div className="zoom-container">
      <div className="zoom-controls">
          <div className="zoom-scale-controls">
            <label htmlFor="zoom-scale">Zoom Level:</label>
            <input
              id="zoom-scale"
              type="range"
              min="2"
              max="10"
              value={appState.ui.zoom.scale}
              onChange={(e) => changeZoomScale(parseInt(e.target.value))}
              aria-label="Zoom scale from 2x to 10x"
            />
            <span>{appState.ui.zoom.scale}x</span>
          </div>
      </div>
      
      <div className="zoom-view">
        <canvas 
          ref={zoomCanvasRef}
          className="zoom-canvas"
          width={200}
          height={200}
          style={{ 
            border: '1px solid #999',
            display: 'block'
          }}
          aria-label="Zoom view showing magnified area around cursor"
        />
        
        {!hasImage && (
          <div className="zoom-placeholder">
            <p>Enable zoom for precise pixel selection</p>
          </div>
        )}
        
        {!hasImage && (
          <div className="zoom-placeholder">
            <p>Load an image to use zoom</p>
          </div>
        )}
      </div>
    </div>
  );
};
