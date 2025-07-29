import React, { useCallback } from 'react';

interface ManualInputsProps {
  appState: any;
  updateAppState: (updates: any) => void;
}

/**
 * ManualInputs Component - Handles manual coordinate input with real-time validation
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.appState - Application state object
 * @param {Function} props.updateAppState - Function to update application state
 * @returns {JSX.Element} Manual input component with number inputs and validation
 */
export const ManualInputs: React.FC<ManualInputsProps> = ({ appState, updateAppState }) => {

  // Validate coordinate value
  const validateCoordinate = useCallback((value: number, dimension: 'width' | 'height'): boolean => {
    if (!appState.image.dimensions) return false;
    
    const max = dimension === 'width' ? appState.image.dimensions.width : appState.image.dimensions.height;
    return value >= 0 && value <= max;
  }, [appState.image.dimensions]);

  // Update line coordinate
  const updateLineCoordinate = useCallback((lineType: string, value: string) => {
    const numValue = parseInt(value);
    
    if (isNaN(numValue)) {
      // Clear the line if input is invalid
      updateAppState({
        lines: { ...appState.lines, [lineType]: null }
      });
      return;
    }

    // Validate coordinate bounds
    const isHorizontal = ['headerBottom', 'footerTop', 'textLine', 'baseline', 'topLine'].includes(lineType);
    const dimension = isHorizontal ? 'height' : 'width';
    
    if (!validateCoordinate(numValue, dimension)) {
      updateAppState({
        ui: {
          ...appState.ui,
          error: `${lineType} coordinate must be between 0 and ${appState.image.dimensions?.[dimension] || 0}`
        }
      });
      return;
    }

    // Update the coordinate
    updateAppState({
      lines: { ...appState.lines, [lineType]: numValue },
      ui: { ...appState.ui, error: null }
    });
  }, [appState, updateAppState, validateCoordinate]);

  // Handle input change
  const handleInputChange = useCallback((lineType: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateLineCoordinate(lineType, value);
  }, [updateLineCoordinate]);

  // Handle input blur (validation)
  const handleInputBlur = useCallback((lineType: string) => (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      updateAppState({
        lines: { ...appState.lines, [lineType]: null }
      });
    }
  }, [appState.lines, updateAppState]);

  // Handle input focus (clear errors)
  const handleInputFocus = useCallback(() => {
    updateAppState({
      ui: { ...appState.ui, error: null }
    });
  }, [appState.ui, updateAppState]);

  // Add letter line from manual input
  const addLetterLine = useCallback((value: string) => {
    const numValue = parseInt(value);
    
    if (isNaN(numValue)) return;
    
    if (!validateCoordinate(numValue, 'width')) {
      updateAppState({
        ui: {
          ...appState.ui,
          error: `Letter line X coordinate must be between 0 and ${appState.image.dimensions?.width || 0}`
        }
      });
      return;
    }

    // Add to letter lines if not already present
    if (!appState.lines.letterLines.includes(numValue)) {
      updateAppState({
        lines: { 
          ...appState.lines, 
          letterLines: [...appState.lines.letterLines, numValue].sort((a, b) => a - b)
        },
        ui: { ...appState.ui, error: null }
      });
    }
  }, [appState, updateAppState, validateCoordinate]);

  // Handle letter line input
  const handleLetterLineSubmit = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const input = event.currentTarget;
      addLetterLine(input.value);
      input.value = '';
    }
  }, [addLetterLine]);

  // Get input validation class
  const getInputClass = useCallback((lineType: string, value: number | null): string => {
    if (value === null) return '';
    
    const isHorizontal = ['headerBottom', 'footerTop', 'textLine', 'baseline', 'topLine'].includes(lineType);
    const dimension = isHorizontal ? 'height' : 'width';
    
    return validateCoordinate(value, dimension) ? 'success' : 'error';
  }, [validateCoordinate]);

  const hasImage = appState.image.dimensions !== null;
  const { lines } = appState;

  return (
    <div className="manual-inputs">
      <h3>Manual Coordinates</h3>
      
      {appState.ui.error && (
        <div className="error-message">
          {appState.ui.error}
        </div>
      )}

      {hasImage && (
        <div className="image-bounds-info">
          <p><strong>Image bounds:</strong> 0 to {appState.image.dimensions.width} (width), 0 to {appState.image.dimensions.height} (height)</p>
        </div>
      )}

      <div className="coordinate-inputs">
        <h4>Horizontal Lines (Y coordinates)</h4>
        
        <div className="input-group">
          <label htmlFor="header-bottom">Header Bottom:</label>
          <input 
            id="header-bottom"
            type="number" 
            min="0"
            max={appState.image.dimensions?.height || 0}
            value={lines.headerBottom || ''}
            onChange={handleInputChange('headerBottom')}
            onBlur={handleInputBlur('headerBottom')}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            className={getInputClass('headerBottom', lines.headerBottom)}
            placeholder="Y coordinate"
            aria-describedby="header-bottom-help"
          />
          <small id="header-bottom-help">
            Y coordinate where header text ends
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="footer-top">Footer Top:</label>
          <input 
            id="footer-top"
            type="number" 
            min="0"
            max={appState.image.dimensions?.height || 0}
            value={lines.footerTop || ''}
            onChange={handleInputChange('footerTop')}
            onBlur={handleInputBlur('footerTop')}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            className={getInputClass('footerTop', lines.footerTop)}
            placeholder="Y coordinate"
            aria-describedby="footer-top-help"
          />
          <small id="footer-top-help">
            Y coordinate where footer text starts
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="text-line">Text Line:</label>
          <input 
            id="text-line"
            type="number" 
            min="0"
            max={appState.image.dimensions?.height || 0}
            value={lines.textLine || ''}
            onChange={handleInputChange('textLine')}
            onBlur={handleInputBlur('textLine')}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            className={getInputClass('textLine', lines.textLine)}
            placeholder="Y coordinate"
            aria-describedby="text-line-help"
          />
          <small id="text-line-help">
            Y coordinate of main text line
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="baseline">Baseline:</label>
          <input 
            id="baseline"
            type="number" 
            min="0"
            max={appState.image.dimensions?.height || 0}
            value={lines.baseline || ''}
            onChange={handleInputChange('baseline')}
            onBlur={handleInputBlur('baseline')}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            className={getInputClass('baseline', lines.baseline)}
            placeholder="Y coordinate"
            aria-describedby="baseline-help"
          />
          <small id="baseline-help">
            Y coordinate of text baseline
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="top-line">Top Line:</label>
          <input 
            id="top-line"
            type="number" 
            min="0"
            max={appState.image.dimensions?.height || 0}
            value={lines.topLine || ''}
            onChange={handleInputChange('topLine')}
            onBlur={handleInputBlur('topLine')}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            className={getInputClass('topLine', lines.topLine)}
            placeholder="Y coordinate"
            aria-describedby="top-line-help"
          />
          <small id="top-line-help">
            Y coordinate of text top line
          </small>
        </div>

        <h4>Vertical Lines (X coordinates)</h4>

        <div className="input-group">
          <label htmlFor="left-start">Left Start:</label>
          <input 
            id="left-start"
            type="number" 
            min="0"
            max={appState.image.dimensions?.width || 0}
            value={lines.leftStart || ''}
            onChange={handleInputChange('leftStart')}
            onBlur={handleInputBlur('leftStart')}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            className={getInputClass('leftStart', lines.leftStart)}
            placeholder="X coordinate"
            aria-describedby="left-start-help"
          />
          <small id="left-start-help">
            X coordinate where text starts on the left
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="right-start">Right Start:</label>
          <input 
            id="right-start"
            type="number" 
            min="0"
            max={appState.image.dimensions?.width || 0}
            value={lines.rightStart || ''}
            onChange={handleInputChange('rightStart')}
            onBlur={handleInputBlur('rightStart')}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            className={getInputClass('rightStart', lines.rightStart)}
            placeholder="X coordinate"
            aria-describedby="right-start-help"
          />
          <small id="right-start-help">
            X coordinate where text starts on the right
          </small>
        </div>

        <h4>Letter Lines</h4>
        
        <div className="input-group">
          <label htmlFor="letter-line-input">Add Letter Line:</label>
          <input 
            id="letter-line-input"
            type="number" 
            min="0"
            max={appState.image.dimensions?.width || 0}
            onKeyDown={handleLetterLineSubmit}
            onFocus={handleInputFocus}
            disabled={!hasImage}
            placeholder="X coordinate (press Enter to add)"
            aria-describedby="letter-line-help"
          />
          <small id="letter-line-help">
            Enter X coordinate and press Enter to add letter line
          </small>
        </div>

        {lines.letterLines.length > 0 && (
          <div className="letter-lines-summary">
            <p><strong>Letter Lines ({lines.letterLines.length}):</strong></p>
            <div className="letter-lines-grid">
              {lines.letterLines.map((x: number, index: number) => (
                <span key={index} className="letter-line-chip">
                  {index + 1}: x={x}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="coordinate-summary">
          <h4>Current Coordinates</h4>
          <div className="summary-grid">
            <div className="summary-item">
              <strong>Header Bottom:</strong> {lines.headerBottom ?? 'Not set'}
            </div>
            <div className="summary-item">
              <strong>Footer Top:</strong> {lines.footerTop ?? 'Not set'}
            </div>
            <div className="summary-item">
              <strong>Text Line:</strong> {lines.textLine ?? 'Not set'}
            </div>
            <div className="summary-item">
              <strong>Baseline:</strong> {lines.baseline ?? 'Not set'}
            </div>
            <div className="summary-item">
              <strong>Top Line:</strong> {lines.topLine ?? 'Not set'}
            </div>
            <div className="summary-item">
              <strong>Left Start:</strong> {lines.leftStart ?? 'Not set'}
            </div>
            <div className="summary-item">
              <strong>Right Start:</strong> {lines.rightStart ?? 'Not set'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
