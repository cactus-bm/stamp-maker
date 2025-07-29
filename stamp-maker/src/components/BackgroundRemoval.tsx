import React, { useCallback, useRef } from 'react';

interface BackgroundRemovalProps {
  appState: any;
  updateAppState: (updates: any) => void;
}

/**
 * Color-to-Alpha Background Removal Algorithm
 * 
 * Converts a target color to transparent pixels using alpha ratio calculations.
 * Based on the GIMP color-to-alpha algorithm for precise background removal.
 * 
 * @param {ImageData} imageData - Source image data from canvas
 * @param {Object} targetColor - RGB color to make transparent
 * @param {number} targetColor.r - Red component (0-255)
 * @param {number} targetColor.g - Green component (0-255)
 * @param {number} targetColor.b - Blue component (0-255)
 * @returns {ImageData} Processed image data with transparency
 */
const removeBackground = (imageData: ImageData, targetColor: { r: number; g: number; b: number }): ImageData => {
  const { r: tr, g: tg, b: tb } = targetColor;
  const result = new ImageData(imageData.width, imageData.height);
  const data = result.data;
  
  // Normalize target color to 0-1 range for calculations
  const targetR = tr / 255;
  const targetG = tg / 255;
  const targetB = tb / 255;
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    // Normalize current pixel color to 0-1 range
    const r = imageData.data[i] / 255;
    const g = imageData.data[i + 1] / 255;
    const b = imageData.data[i + 2] / 255;
    
    // Calculate alpha ratio - determines how much of target color to remove
    let alphaRatio = 1;
    if (targetR > 0) alphaRatio = Math.min(alphaRatio, r / targetR);
    if (targetG > 0) alphaRatio = Math.min(alphaRatio, g / targetG);
    if (targetB > 0) alphaRatio = Math.min(alphaRatio, b / targetB);
    
    // Clamp alpha ratio and calculate final alpha
    alphaRatio = Math.max(0, Math.min(1, alphaRatio));
    const alpha = 1 - alphaRatio;
    
    // Apply color-to-alpha conversion formula
    const newR = alpha > 0 ? (r - targetR * (1 - alpha)) / alpha : 0;
    const newG = alpha > 0 ? (g - targetG * (1 - alpha)) / alpha : 0;
    const newB = alpha > 0 ? (b - targetB * (1 - alpha)) / alpha : 0;
    
    // Convert back to 0-255 range and store in result
    data[i]     = Math.round(Math.max(0, Math.min(1, newR)) * 255);
    data[i + 1] = Math.round(Math.max(0, Math.min(1, newG)) * 255);
    data[i + 2] = Math.round(Math.max(0, Math.min(1, newB)) * 255);
    data[i + 3] = Math.round(alpha * 255);
  }
  
  return result;
};

/**
 * BackgroundRemoval Component - Handles background removal using color-to-alpha
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.appState - Application state object
 * @param {Function} props.updateAppState - Function to update application state
 * @returns {JSX.Element} Background removal component
 */
export const BackgroundRemoval: React.FC<BackgroundRemovalProps> = ({ appState, updateAppState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get pixel color at coordinates
  const getPixelColor = useCallback((x: number, y: number): { r: number; g: number; b: number } | null => {
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    
    if (!ctx || !appState.image.original) {
      return null;
    }
    
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;
    
    return {
      r: data[0],
      g: data[1],
      b: data[2]
    };
  }, [appState.image.original]);

  // Process background removal at clicked coordinates
  const processBackgroundRemoval = useCallback((x: number, y: number) => {
    if (!appState.image.original) {
      updateAppState({
        ui: { ...appState.ui, error: 'No image loaded for background removal' }
      });
      return;
    }

    updateAppState({
      ui: { ...appState.ui, loading: true, error: null }
    });

    try {
      // Get target color from clicked pixel
      const targetColor = getPixelColor(x, y);
      if (!targetColor) {
        throw new Error('Could not get pixel color');
      }

      // Apply background removal algorithm
      const processedImageData = removeBackground(appState.image.original, targetColor);
      
      // Update canvas with processed image
      const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');
      
      if (ctx) {
        ctx.putImageData(processedImageData, 0, 0);
      }

      // Update application state
      updateAppState({
        image: {
          ...appState.image,
          processed: processedImageData
        },
        ui: { 
          ...appState.ui, 
          loading: false,
          currentTool: 'none'
        }
      });

    } catch (error) {
      updateAppState({
        ui: { 
          ...appState.ui, 
          loading: false, 
          error: 'Failed to remove background. Please try again.' 
        }
      });
    }
  }, [appState, updateAppState, getPixelColor]);

  // Handle canvas click for background removal
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (appState.ui.currentTool !== 'background') {
      return;
    }

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    
    processBackgroundRemoval(x, y);
  }, [appState.ui.currentTool, processBackgroundRemoval]);

  // Enable background removal tool
  const enableBackgroundRemoval = useCallback(() => {
    updateAppState({
      ui: { 
        ...appState.ui, 
        currentTool: 'background',
        error: null
      }
    });
  }, [appState, updateAppState]);

  // Reset to original image
  const resetToOriginal = useCallback(() => {
    if (!appState.image.original) return;

    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    
    if (ctx) {
      ctx.putImageData(appState.image.original, 0, 0);
    }

    updateAppState({
      image: {
        ...appState.image,
        processed: null
      },
      ui: {
        ...appState.ui,
        currentTool: 'none'
      }
    });
  }, [appState, updateAppState]);

  const hasImage = appState.image.original !== null;
  const hasProcessedImage = appState.image.processed !== null;
  const isBackgroundTool = appState.ui.currentTool === 'background';
  const isLoading = appState.ui.loading;

  return (
    <div className="background-removal-section">
      <h3>Background Removal</h3>
      
      {appState.ui.error && (
        <div className="error-message">
          {appState.ui.error}
        </div>
      )}

      <div className="background-controls">
        <button 
          className={`tool-btn ${isBackgroundTool ? 'active' : ''} ${hasProcessedImage ? 'completed' : ''}`}
          onClick={enableBackgroundRemoval}
          disabled={!hasImage || isLoading}
          aria-label="Remove background by clicking on the color to remove"
        >
          {isLoading ? 'Processing...' : 'Remove Background'}
        </button>
        
        {hasProcessedImage && (
          <button 
            className="tool-btn"
            onClick={resetToOriginal}
            disabled={isLoading}
            aria-label="Reset to original image"
          >
            Reset to Original
          </button>
        )}
      </div>

      {isBackgroundTool && (
        <div className="tool-instructions">
          <p><strong>Instructions:</strong> Click on the color you want to remove from the image.</p>
          <p>The algorithm will make that color transparent throughout the image.</p>
        </div>
      )}

      {hasProcessedImage && (
        <div className="success-message">
          ✓ Background removed successfully
        </div>
      )}

      {/* Hidden canvas for processing - we'll use the main canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        onClick={handleCanvasClick}
      />
    </div>
  );
};
