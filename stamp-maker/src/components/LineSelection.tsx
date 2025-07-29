import React, { useCallback, useEffect } from 'react';

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


    </div>
  );
};
