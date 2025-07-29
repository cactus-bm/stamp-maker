import React, { useCallback, useEffect, useRef } from 'react';

interface LineSelectionProps {
  appState: any;
  updateAppState: (updates: any) => void;
}

/**
 * LineSelection Component - Handles selection of horizontal, vertical, and letter lines
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.appState - Application state object
 * @param {Function} props.updateAppState - Function to update application state
 * @returns {JSX.Element} Line selection component with all line types
 */
export const LineSelection: React.FC<LineSelectionProps> = ({ appState, updateAppState }) => {
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  // Draw all lines on overlay canvas
  const drawLines = useCallback(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    
    if (!overlayCanvas || !mainCanvas || !appState.image.dimensions) {
      return;
    }

    // Set overlay canvas size to match main canvas
    overlayCanvas.width = mainCanvas.width;
    overlayCanvas.height = mainCanvas.height;
    overlayCanvas.style.width = mainCanvas.style.width;
    overlayCanvas.style.height = mainCanvas.style.height;

    const ctx = overlayCanvas.getContext('2d');
    if (!ctx) return;

    // Clear overlay
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    const { lines } = appState;
    const { width, height } = appState.image.dimensions;

    // Draw horizontal lines
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    // Header bottom line
    if (lines.headerBottom !== null) {
      ctx.beginPath();
      ctx.moveTo(0, lines.headerBottom);
      ctx.lineTo(width, lines.headerBottom);
      ctx.stroke();
      
      // Label
      ctx.fillStyle = '#ff0000';
      ctx.font = '12px Arial';
      ctx.fillText('Header End', 5, lines.headerBottom - 5);
    }

    // Footer top line
    if (lines.footerTop !== null) {
      ctx.beginPath();
      ctx.moveTo(0, lines.footerTop);
      ctx.lineTo(width, lines.footerTop);
      ctx.stroke();
      
      ctx.fillText('Footer Start', 5, lines.footerTop - 5);
    }

    // Text line
    if (lines.textLine !== null) {
      ctx.strokeStyle = '#00ff00';
      ctx.beginPath();
      ctx.moveTo(0, lines.textLine);
      ctx.lineTo(width, lines.textLine);
      ctx.stroke();
      
      ctx.fillStyle = '#00ff00';
      ctx.fillText('Text Line', 5, lines.textLine - 5);
    }

    // Baseline
    if (lines.baseline !== null) {
      ctx.strokeStyle = '#0000ff';
      ctx.beginPath();
      ctx.moveTo(0, lines.baseline);
      ctx.lineTo(width, lines.baseline);
      ctx.stroke();
      
      ctx.fillStyle = '#0000ff';
      ctx.fillText('Baseline', 5, lines.baseline - 5);
    }

    // Top line
    if (lines.topLine !== null) {
      ctx.strokeStyle = '#ff00ff';
      ctx.beginPath();
      ctx.moveTo(0, lines.topLine);
      ctx.lineTo(width, lines.topLine);
      ctx.stroke();
      
      ctx.fillStyle = '#ff00ff';
      ctx.fillText('Top Line', 5, lines.topLine - 5);
    }

    // Vertical lines
    ctx.strokeStyle = '#ffaa00';
    
    // Left start line
    if (lines.leftStart !== null) {
      ctx.beginPath();
      ctx.moveTo(lines.leftStart, 0);
      ctx.lineTo(lines.leftStart, height);
      ctx.stroke();
      
      ctx.fillStyle = '#ffaa00';
      ctx.save();
      ctx.translate(lines.leftStart + 5, 15);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Left Start', 0, 0);
      ctx.restore();
    }

    // Right start line
    if (lines.rightStart !== null) {
      ctx.beginPath();
      ctx.moveTo(lines.rightStart, 0);
      ctx.lineTo(lines.rightStart, height);
      ctx.stroke();
      
      ctx.fillStyle = '#ffaa00';
      ctx.save();
      ctx.translate(lines.rightStart + 5, 15);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Right Start', 0, 0);
      ctx.restore();
    }

    // Letter lines
    ctx.strokeStyle = '#aa00ff';
    ctx.setLineDash([5, 5]);
    
    lines.letterLines.forEach((x: number, index: number) => {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      
      ctx.fillStyle = '#aa00ff';
      ctx.save();
      ctx.translate(x + 5, 30 + index * 15);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(`Letter ${index + 1}`, 0, 0);
      ctx.restore();
    });

  }, [appState.lines, appState.image.dimensions]);

  // Handle canvas click for line selection
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    
    const { currentTool } = appState.ui;
    
    switch (currentTool) {
      case 'header':
        updateAppState({
          lines: { ...appState.lines, headerBottom: y },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
      case 'footer':
        updateAppState({
          lines: { ...appState.lines, footerTop: y },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
      case 'text':
        updateAppState({
          lines: { ...appState.lines, textLine: y },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
      case 'baseline':
        updateAppState({
          lines: { ...appState.lines, baseline: y },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
      case 'top':
        updateAppState({
          lines: { ...appState.lines, topLine: y },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
      case 'left':
        updateAppState({
          lines: { ...appState.lines, leftStart: x },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
      case 'right':
        updateAppState({
          lines: { ...appState.lines, rightStart: x },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
      case 'letter':
        updateAppState({
          lines: { 
            ...appState.lines, 
            letterLines: [...appState.lines.letterLines, x].sort((a, b) => a - b)
          },
          ui: { ...appState.ui, currentTool: 'none' }
        });
        break;
    }
  }, [appState.lines, appState.ui, updateAppState]);

  // Set current tool
  const setTool = useCallback((tool: string) => {
    updateAppState({
      ui: { ...appState.ui, currentTool: tool, error: null }
    });
  }, [appState.ui, updateAppState]);

  // Remove letter line
  const removeLetterLine = useCallback((index: number) => {
    const newLetterLines = [...appState.lines.letterLines];
    newLetterLines.splice(index, 1);
    updateAppState({
      lines: { ...appState.lines, letterLines: newLetterLines }
    });
  }, [appState.lines, updateAppState]);

  // Clear all lines
  const clearAllLines = useCallback(() => {
    updateAppState({
      lines: {
        headerBottom: null,
        footerTop: null,
        textLine: null,
        baseline: null,
        topLine: null,
        leftStart: null,
        rightStart: null,
        letterLines: [],
      },
      ui: { ...appState.ui, currentTool: 'none' }
    });
  }, [appState.ui, updateAppState]);

  // Update overlay when lines change
  useEffect(() => {
    drawLines();
  }, [drawLines]);

  // Position overlay canvas over main canvas
  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    
    if (overlayCanvas && mainCanvas) {
      const mainRect = mainCanvas.getBoundingClientRect();
      const containerRect = mainCanvas.parentElement?.getBoundingClientRect();
      
      if (containerRect) {
        overlayCanvas.style.position = 'absolute';
        overlayCanvas.style.left = `${mainRect.left - containerRect.left}px`;
        overlayCanvas.style.top = `${mainRect.top - containerRect.top}px`;
        overlayCanvas.style.pointerEvents = 'none';
        overlayCanvas.style.zIndex = '10';
      }
    }
  }, [appState.image.dimensions]);

  const hasImage = appState.image.original !== null;
  const { currentTool } = appState.ui;
  const { lines } = appState;

  return (
    <div className="line-selection-section">
      <h3>Line Selection</h3>
      
      {appState.ui.error && (
        <div className="error-message">
          {appState.ui.error}
        </div>
      )}

      <div className="line-tools">
        <h4>Horizontal Lines</h4>
        <button 
          className={`tool-btn ${currentTool === 'header' ? 'active' : ''} ${lines.headerBottom !== null ? 'completed' : ''}`}
          onClick={() => setTool('header')}
          disabled={!hasImage}
          aria-label="Select header end line"
        >
          Select Header End
        </button>
        
        <button 
          className={`tool-btn ${currentTool === 'footer' ? 'active' : ''} ${lines.footerTop !== null ? 'completed' : ''}`}
          onClick={() => setTool('footer')}
          disabled={!hasImage}
          aria-label="Select footer start line"
        >
          Select Footer Start
        </button>
        
        <button 
          className={`tool-btn ${currentTool === 'text' ? 'active' : ''} ${lines.textLine !== null ? 'completed' : ''}`}
          onClick={() => setTool('text')}
          disabled={!hasImage}
          aria-label="Select text line"
        >
          Select Text Line
        </button>
        
        <button 
          className={`tool-btn ${currentTool === 'baseline' ? 'active' : ''} ${lines.baseline !== null ? 'completed' : ''}`}
          onClick={() => setTool('baseline')}
          disabled={!hasImage}
          aria-label="Select baseline"
        >
          Select Baseline
        </button>
        
        <button 
          className={`tool-btn ${currentTool === 'top' ? 'active' : ''} ${lines.topLine !== null ? 'completed' : ''}`}
          onClick={() => setTool('top')}
          disabled={!hasImage}
          aria-label="Select top line"
        >
          Select Top Line
        </button>

        <h4>Vertical Lines</h4>
        <button 
          className={`tool-btn ${currentTool === 'left' ? 'active' : ''} ${lines.leftStart !== null ? 'completed' : ''}`}
          onClick={() => setTool('left')}
          disabled={!hasImage}
          aria-label="Select left start line"
        >
          Select Left Start
        </button>
        
        <button 
          className={`tool-btn ${currentTool === 'right' ? 'active' : ''} ${lines.rightStart !== null ? 'completed' : ''}`}
          onClick={() => setTool('right')}
          disabled={!hasImage}
          aria-label="Select right start line"
        >
          Select Right Start
        </button>

        <h4>Letter Lines</h4>
        <button 
          className={`tool-btn ${currentTool === 'letter' ? 'active' : ''}`}
          onClick={() => setTool('letter')}
          disabled={!hasImage}
          aria-label="Add letter line"
        >
          Add Letter Line
        </button>
        
        {lines.letterLines.length > 0 && (
          <div className="letter-lines-list">
            <p>Letter Lines ({lines.letterLines.length}):</p>
            {lines.letterLines.map((x: number, index: number) => (
              <div key={index} className="letter-line-item">
                <span>Letter {index + 1}: x={x}</span>
                <button 
                  className="remove-btn"
                  onClick={() => removeLetterLine(index)}
                  aria-label={`Remove letter line ${index + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="line-actions">
          <button 
            className="tool-btn"
            onClick={clearAllLines}
            disabled={!hasImage}
            aria-label="Clear all lines"
          >
            Clear All Lines
          </button>
        </div>
      </div>

      {currentTool !== 'none' && currentTool !== 'background' && (
        <div className="tool-instructions">
          <p><strong>Instructions:</strong> Click on the image to place the {currentTool} line.</p>
          {currentTool === 'letter' && (
            <p>You can add multiple letter lines. They will be sorted automatically.</p>
          )}
        </div>
      )}

      {/* Overlay canvas for drawing lines */}
      <canvas
        ref={overlayCanvasRef}
        className="line-overlay"
        onClick={handleCanvasClick}
        style={{ 
          position: 'absolute',
          pointerEvents: currentTool !== 'none' && currentTool !== 'background' ? 'auto' : 'none',
          zIndex: 10
        }}
        aria-label="Line overlay for visual feedback"
      />
    </div>
  );
};
