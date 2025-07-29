import React, { useCallback, useState } from 'react';

interface JsonExportProps {
  appState: any;
  updateAppState: (updates: any) => void;
}

/**
 * JsonExport Component - Handles export of stamp data to JSON format
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.appState - Application state object
 * @param {Function} props.updateAppState - Function to update application state
 * @returns {JSX.Element} JSON export component with validation and download
 */
export const JsonExport: React.FC<JsonExportProps> = ({ appState, updateAppState }) => {
  const [isExporting, setIsExporting] = useState(false);

  // Validate required fields for export
  const validateExportData = useCallback((): string[] => {
    const errors: string[] = [];
    
    if (!appState.export.name.trim()) {
      errors.push('Stamp name is required');
    }
    
    if (!appState.image.processed && !appState.image.original) {
      errors.push('No image loaded');
    }
    
    if (appState.lines.headerBottom === null) {
      errors.push('Header bottom line is required');
    }
    
    if (appState.lines.footerTop === null) {
      errors.push('Footer top line is required');
    }
    
    if (appState.lines.textLine === null) {
      errors.push('Text line is required');
    }
    
    if (appState.lines.baseline === null) {
      errors.push('Baseline is required');
    }
    
    if (appState.lines.leftStart === null) {
      errors.push('Left start line is required');
    }
    
    if (appState.lines.rightStart === null) {
      errors.push('Right start line is required');
    }
    
    return errors;
  }, [appState]);

  // Convert image to base64 data URL
  const getImageDataUrl = useCallback((): string => {
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas not found');
    }
    
    // Use processed image if available, otherwise original
    const imageData = appState.image.processed || appState.image.original;
    if (imageData) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(imageData, 0, 0);
      }
    }
    
    return canvas.toDataURL('image/png');
  }, [appState.image]);

  // Generate stamp file data according to the specification
  const generateStampData = useCallback(() => {
    const { lines, image, export: exportData } = appState;
    
    if (!image.dimensions) {
      throw new Error('Image dimensions not available');
    }

    // Calculate fontSize based on the distance between baseline and text line
    const fontSize = lines.baseline && lines.textLine 
      ? Math.abs(lines.baseline - lines.textLine)
      : 32; // Default font size

    // Generate base coordinates from letter lines
    const baseCoordinate = [
      lines.letterLines.map((x: number) => ({
        x: x,
        y: lines.baseline || 0
      }))
    ];

    // Create stamp data object matching the specification
    const stampData = {
      name: exportData.name.trim(),
      type: "SYNDICATE",
      headerBottom: lines.headerBottom,
      footerTop: lines.footerTop,
      fontSize: fontSize,
      referenceHeight: image.dimensions.height,
      leftStart: [{
        x: lines.leftStart,
        y: lines.baseline || 0
      }],
      rightStart: [{
        x: lines.rightStart,
        y: lines.baseline || 0
      }],
      baseCoordinate: baseCoordinate,
      offset: { x: 0, y: 0 },
      imageData: getImageDataUrl()
    };

    return stampData;
  }, [appState, getImageDataUrl]);

  // Handle export button click
  const handleExport = useCallback(async () => {
    const validationErrors = validateExportData();
    
    if (validationErrors.length > 0) {
      updateAppState({
        ui: {
          ...appState.ui,
          error: `Cannot export: ${validationErrors.join(', ')}`
        }
      });
      return;
    }

    setIsExporting(true);
    updateAppState({
      ui: { ...appState.ui, loading: true, error: null }
    });

    try {
      const stampData = generateStampData();
      
      // Convert to JSON string
      const jsonString = JSON.stringify(stampData, null, 2);
      
      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${appState.export.name.replace(/[^a-zA-Z0-9]/g, '_')}.stamp`;
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      updateAppState({
        export: { ...appState.export, ready: true },
        ui: { ...appState.ui, loading: false, error: null }
      });

    } catch (error) {
      updateAppState({
        ui: {
          ...appState.ui,
          loading: false,
          error: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      });
    } finally {
      setIsExporting(false);
    }
  }, [appState, updateAppState, validateExportData, generateStampData]);

  // Handle name input change
  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    updateAppState({
      export: { ...appState.export, name }
    });
  }, [appState.export, updateAppState]);

  // Preview export data
  const previewData = useCallback(() => {
    try {
      const stampData = generateStampData();
      console.log('Preview stamp data:', stampData);
      
      // Show preview in a modal or alert
      const preview = JSON.stringify(stampData, null, 2);
      alert(`Stamp Data Preview:\n\n${preview.substring(0, 500)}${preview.length > 500 ? '...' : ''}`);
    } catch (error) {
      updateAppState({
        ui: {
          ...appState.ui,
          error: `Preview failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      });
    }
  }, [generateStampData, updateAppState, appState.ui]);

  const validationErrors = validateExportData();
  const isValid = validationErrors.length === 0;
  const hasImage = appState.image.original !== null;

  return (
    <div className="export-section">
      <h3>Export Stamp File</h3>
      
      {appState.ui.error && (
        <div className="error-message">
          {appState.ui.error}
        </div>
      )}

      {appState.export.ready && (
        <div className="success-message">
          ✓ Stamp file exported successfully!
        </div>
      )}

      <div className="export-controls">
        <div className="input-group">
          <label htmlFor="stamp-name">Stamp Name:</label>
          <input 
            id="stamp-name"
            type="text" 
            placeholder="Enter stamp name"
            value={appState.export.name}
            onChange={handleNameChange}
            disabled={isExporting}
            className={appState.export.name.trim() ? 'success' : 'error'}
            aria-describedby="stamp-name-help"
          />
          <small id="stamp-name-help">
            This will be used as the filename and stamp identifier
          </small>
        </div>

        <div className="export-validation">
          <h4>Export Checklist:</h4>
          <ul className="validation-list">
            <li className={appState.export.name.trim() ? 'valid' : 'invalid'}>
              {appState.export.name.trim() ? '✓' : '✗'} Stamp name entered
            </li>
            <li className={hasImage ? 'valid' : 'invalid'}>
              {hasImage ? '✓' : '✗'} Image loaded
            </li>
            <li className={appState.lines.headerBottom !== null ? 'valid' : 'invalid'}>
              {appState.lines.headerBottom !== null ? '✓' : '✗'} Header bottom line set
            </li>
            <li className={appState.lines.footerTop !== null ? 'valid' : 'invalid'}>
              {appState.lines.footerTop !== null ? '✓' : '✗'} Footer top line set
            </li>
            <li className={appState.lines.textLine !== null ? 'valid' : 'invalid'}>
              {appState.lines.textLine !== null ? '✓' : '✗'} Text line set
            </li>
            <li className={appState.lines.baseline !== null ? 'valid' : 'invalid'}>
              {appState.lines.baseline !== null ? '✓' : '✗'} Baseline set
            </li>
            <li className={appState.lines.leftStart !== null ? 'valid' : 'invalid'}>
              {appState.lines.leftStart !== null ? '✓' : '✗'} Left start line set
            </li>
            <li className={appState.lines.rightStart !== null ? 'valid' : 'invalid'}>
              {appState.lines.rightStart !== null ? '✓' : '✗'} Right start line set
            </li>
          </ul>
        </div>

        <div className="export-actions">
          <button 
            className="tool-btn"
            onClick={previewData}
            disabled={!hasImage || isExporting}
            aria-label="Preview export data"
          >
            Preview Data
          </button>
          
          <button 
            className="export-btn"
            onClick={handleExport}
            disabled={!isValid || isExporting}
            aria-label="Export stamp file as JSON"
          >
            {isExporting ? 'Exporting...' : 'Export Stamp File'}
          </button>
        </div>

        {!isValid && validationErrors.length > 0 && (
          <div className="validation-errors">
            <p><strong>Required before export:</strong></p>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="export-info">
          <h4>Export Format:</h4>
          <p>The exported file will be in JSON format with the following structure:</p>
          <ul>
            <li><strong>name:</strong> Stamp identifier</li>
            <li><strong>type:</strong> Always "SYNDICATE"</li>
            <li><strong>headerBottom:</strong> Y-coordinate of header end</li>
            <li><strong>footerTop:</strong> Y-coordinate of footer start</li>
            <li><strong>fontSize:</strong> Calculated from text line spacing</li>
            <li><strong>referenceHeight:</strong> Image height in pixels</li>
            <li><strong>leftStart/rightStart:</strong> X-coordinates of text boundaries</li>
            <li><strong>baseCoordinate:</strong> Letter line positions</li>
            <li><strong>imageData:</strong> Base64-encoded PNG image</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
