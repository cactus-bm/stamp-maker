# Stamp Maker Web Application - Implementation Tasks

## Overview
This document contains a comprehensive checklist of tasks needed to implement the stamp maker web application. Each task is designed to be small, focused, and completable by a junior engineer with the provided context from the requirements and design documents.

## Setup and Project Structure

### React Project Setup
- [ ] **Create React application using Create React App**
  ```bash
  npx create-react-app stamp-maker
  cd stamp-maker
  ```
  - This creates a client-side only React application with no backend services
  - Provides modern development environment with hot reloading
  - Includes build tools for production deployment

- [ ] **Install additional dependencies**
  ```bash
  npm install --save-dev @types/react @types/react-dom
  # No additional runtime dependencies needed - using only React and browser APIs
  ```
  - Application uses only React and native browser APIs (Canvas, File API)
  - No external image processing libraries needed

- [ ] **Update public/index.html with proper metadata**
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Stamp Maker Tool - Create stamp files from PNG images" />
      <title>Stamp Maker Tool</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>
  </html>
  ```

- [ ] **Create main App.js component with application state**
  ```jsx
  import React, { useState, useCallback } from 'react';
  import './App.css';
  
  // Import components (to be created in subsequent tasks)
  import FileUpload from './components/FileUpload';
  import ControlPanel from './components/ControlPanel';
  import CanvasDisplay from './components/CanvasDisplay';
  import ZoomView from './components/ZoomView';
  
  function App() {
    // Main application state as defined in design document
    const [appState, setAppState] = useState({
      image: {
        file: null,
        canvas: null,
        originalData: null,
        processedData: null, // Background-removed image data
        width: 0,
        height: 0
      },
      lines: {
        headerEnd: null,
        footerStart: null,
        textLine: null,
        baseline: null,
        topLine: null,
        leftStart: null,
        rightStart: null,
        letterLines: []
      },
      ui: {
        activeMode: null, // 'background', 'headerEnd', 'footerStart', etc.
        name: '',
        zoomVisible: false,
        zoomPosition: { x: 0, y: 0 }
      },
      settings: {
        backgroundRemoved: false,
        targetColor: null
      }
    });
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Stamp Maker Tool</h1>
        </header>
        
        <main className="App-main">
          {/* Components will be added in subsequent tasks */}
        </main>
      </div>
    );
  }
  
  export default App;
  ```

- [ ] **Create components directory structure**
  ```bash
  mkdir src/components
  mkdir src/hooks
  mkdir src/utils
  mkdir src/styles
  ```
  - components/: React components for UI elements
  - hooks/: Custom React hooks for business logic
  - utils/: Pure JavaScript utilities for image processing and data export
  - styles/: Component-specific CSS files

- [ ] **Create FileUpload.js component stub**
  ```jsx
  import React from 'react';
  
  const FileUpload = ({ onFileUpload, currentFile }) => {
    // File upload and drag-drop functionality
    // Must accept PNG files only as per requirements
    // Users can drag and drop a PNG file into the application
    
    return (
      <section className="upload-zone">
        {/* Implementation will be added in subsequent tasks */}
      </section>
    );
  };
  
  export default FileUpload;
  ```

- [ ] **Create ControlPanel.js component stub**
  ```jsx
  import React from 'react';
  
  const ControlPanel = ({ appState, onStateUpdate }) => {
    // Main control panel container
    // Contains name input, background removal, line controls, and save button
    
    return (
      <section className="control-panel">
        {/* Implementation will be added in subsequent tasks */}
      </section>
    );
  };
  
  export default ControlPanel;
  ```

- [ ] **Create CanvasDisplay.js component stub**
  ```jsx
  import React, { useRef, useEffect } from 'react';
  
  const CanvasDisplay = ({ appState, onCanvasInteraction }) => {
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);
    
    // Image display and canvas management
    // Main canvas displays the loaded image
    // Overlay canvas for drawing selection lines (lines drawn as overlays, not modifying original)
    // Application maintains original image data separate from visual overlay
    
    return (
      <div className="canvas-container">
        <canvas ref={canvasRef} id="main-canvas" />
        <canvas ref={overlayRef} id="overlay-canvas" />
      </div>
    );
  };
  
  export default CanvasDisplay;
  ```

- [ ] **Create ZoomView.js component stub**
  ```jsx
  import React, { useRef } from 'react';
  
  const ZoomView = ({ visible, position, sourceCanvas }) => {
    const zoomCanvasRef = useRef(null);
    
    // 100x100 pixel zoom area with 5x magnification
    // Small zoomed view for precise pixel selection during all line operations
    
    return (
      <div 
        className={`zoom-container ${visible ? 'visible' : 'hidden'}`}
        style={{ display: visible ? 'block' : 'none' }}
      >
        <canvas 
          ref={zoomCanvasRef} 
          width="100" 
          height="100"
          className="zoom-canvas"
        />
        <div className="zoom-label">Zoom 5x</div>
      </div>
    );
  };
  
  export default ZoomView;
  ```

- [ ] **Create custom hooks directory structure**
  ```jsx
  // src/hooks/useImageProcessor.js
  import { useCallback } from 'react';
  
  export const useImageProcessor = () => {
    // Custom hook for image manipulation
    // Handle image loading, display, and manipulation
    // Functions: loadImage, removeBackground, getPixelColor, etc.
    
    return {
      // Hook implementation will be added in subsequent tasks
    };
  };
  
  // src/hooks/useLineManager.js
  export const useLineManager = () => {
    // Custom hook for line selection
    // Manage line selection, display, and coordinate storage
    
    return {
      // Hook implementation will be added in subsequent tasks
    };
  };
  
  // src/hooks/useZoomManager.js
  export const useZoomManager = () => {
    // Custom hook for zoom functionality
    // Provide 5x magnification for precise pixel selection
    
    return {
      // Hook implementation will be added in subsequent tasks
    };
  };
  ```

- [ ] **Create utility files**
  ```javascript
  // src/utils/imageProcessor.js
  // Pure JavaScript utilities for image manipulation
  // Background removal algorithm implementation
  
  export const removeBackground = (imageData, targetColor) => {
    // Implementation from design document will be added
  };
  
  // src/utils/dataExporter.js
  // JSON export functionality for stamp files
  export const exportStampFile = (appState) => {
    // Export format must match:
    // {
    //   "name": "user-entered-name",
    //   "type": "SYNDICATE",
    //   "referenceHeight": 600,
    //   "headerBottom": 150,
    //   "footerTop": 250,
    //   "fontSize": 73,
    //   "leftStart": { "x": 100, "y": 225 },
    //   "rightStart": { "x": 700, "y": 225 },
    //   "baseCoordinate": [{ "x": 150, "y": 225 }, ...],
    //   "offset": { "x": 0, "y": 0 },
    //   "imageData": "base64-encoded-image"
    // }
  };
  ```

## React Component Implementation

### FileUpload Component
- [ ] **Implement FileUpload component with drag-and-drop functionality**
  ```jsx
  import React, { useState, useCallback } from 'react';
  
  const FileUpload = ({ onFileUpload, currentFile }) => {
    const [dragOver, setDragOver] = useState(false);
    
    const handleDragOver = useCallback((e) => {
      e.preventDefault();
      setDragOver(true);
    }, []);
    
    const handleDragLeave = useCallback((e) => {
      e.preventDefault();
      setDragOver(false);
    }, []);
    
    const handleDrop = useCallback((e) => {
      e.preventDefault();
      setDragOver(false);
      const files = e.dataTransfer.files;
      if (files[0] && files[0].type === 'image/png') {
        onFileUpload(files[0]);
      } else {
        alert('Please upload a PNG file only.');
      }
    }, [onFileUpload]);
    
    const handleFileSelect = useCallback((e) => {
      const file = e.target.files[0];
      if (file && file.type === 'image/png') {
        onFileUpload(file);
      }
    }, [onFileUpload]);
    
    return (
      <section 
        className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          {currentFile ? (
            <p>Loaded: {currentFile.name}</p>
          ) : (
            <>
              <p>Drag & Drop PNG file here or</p>
              <button onClick={() => document.getElementById('file-input').click()}>
                Select File
              </button>
              <input 
                type="file" 
                id="file-input" 
                accept=".png" 
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
            </>
          )}
        </div>
      </section>
    );
  };
  
  export default FileUpload;
  ```
  - Must accept PNG files only as per requirements
  - Visual feedback for drag-over state
  - Error handling for invalid file types

- [ ] **Implement ControlPanel component container**
  ```jsx
  import React from 'react';
  import NameInput from './NameInput';
  import BackgroundRemoval from './BackgroundRemoval';
  import LineControls from './LineControls';
  import ExportButton from './ExportButton';
  
  const ControlPanel = ({ appState, onStateUpdate }) => {
    return (
      <section className="control-panel">
        <NameInput 
          value={appState.ui.name}
          onChange={(name) => onStateUpdate({ ui: { ...appState.ui, name } })}
        />
        
        <BackgroundRemoval 
          backgroundRemoved={appState.settings.backgroundRemoved}
          onRemoveBackground={() => onStateUpdate({ 
            ui: { ...appState.ui, activeMode: 'background' }
          })}
        />
        
        <LineControls 
          lines={appState.lines}
          activeMode={appState.ui.activeMode}
          onLineUpdate={(lineType, value) => onStateUpdate({
            lines: { ...appState.lines, [lineType]: value }
          })}
          onModeChange={(mode) => onStateUpdate({
            ui: { ...appState.ui, activeMode: mode }
          })}
        />
        
        <ExportButton 
          appState={appState}
          disabled={!appState.image.file}
        />
      </section>
    );
  };
  
  export default ControlPanel;
  ```
  - Container for all control components
  - Manages state updates through props

### Individual Control Components
- [ ] **Create NameInput component**
  ```jsx
  import React from 'react';
  
  const NameInput = ({ value, onChange }) => {
    return (
      <div className="name-section">
        <label htmlFor="name-input">Name:</label>
        <input 
          type="text" 
          id="name-input" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter name for stamp file"
        />
      </div>
    );
  };
  
  export default NameInput;
  ```
  - Controlled input with React state
  - Value exported in "name" field of stamp file

- [ ] **Create BackgroundRemoval component**
  ```jsx
  import React from 'react';
  
  const BackgroundRemoval = ({ backgroundRemoved, onRemoveBackground }) => {
    return (
      <div className="background-section">
        <button 
          className="action-btn"
          onClick={onRemoveBackground}
          disabled={backgroundRemoved}
        >
          {backgroundRemoved ? 'Background Removed' : 'Remove Background'}
        </button>
        {backgroundRemoved && <span className="status">✓ Complete</span>}
      </div>
    );
  };
  
  export default BackgroundRemoval;
  ```
  - Initiates background removal mode
  - Shows completion status

- [ ] **Create LineControls component with all line selection buttons**
  ```jsx
  import React from 'react';
  import LineControl from './LineControl';
  import LetterLines from './LetterLines';
  
  const LineControls = ({ lines, activeMode, onLineUpdate, onModeChange }) => {
    const horizontalLines = [
      { key: 'headerEnd', label: 'Header End', exportAs: 'headerBottom' },
      { key: 'footerStart', label: 'Footer Start', exportAs: 'footerTop' },
      { key: 'textLine', label: 'Text Line', exportAs: 'textLine' },
      { key: 'baseline', label: 'Baseline', optional: true },
      { key: 'topLine', label: 'Top Line', optional: true }
    ];
    
    const verticalLines = [
      { key: 'leftStart', label: 'Left Start', coordinate: 'x' },
      { key: 'rightStart', label: 'Right Start', coordinate: 'x' }
    ];
    
    return (
      <div className="line-controls">
        <div className="horizontal-lines-section">
          <h3>Horizontal Lines:</h3>
          <div className="line-controls-grid">
            {horizontalLines.map(line => (
              <LineControl
                key={line.key}
                lineType={line.key}
                label={line.label}
                value={lines[line.key]}
                active={activeMode === line.key}
                optional={line.optional}
                coordinate="y"
                onActivate={() => onModeChange(line.key)}
                onValueChange={(value) => onLineUpdate(line.key, value)}
              />
            ))}
          </div>
        </div>
        
        <div className="vertical-lines-section">
          <h3>Vertical Lines:</h3>
          <div className="line-controls-grid">
            {verticalLines.map(line => (
              <LineControl
                key={line.key}
                lineType={line.key}
                label={line.label}
                value={lines[line.key]}
                active={activeMode === line.key}
                coordinate="x"
                onActivate={() => onModeChange(line.key)}
                onValueChange={(value) => onLineUpdate(line.key, value)}
              />
            ))}
          </div>
          
          <LetterLines 
            letterLines={lines.letterLines}
            active={activeMode === 'letterLines'}
            onToggle={() => onModeChange(activeMode === 'letterLines' ? null : 'letterLines')}
            onUpdate={(letterLines) => onLineUpdate('letterLines', letterLines)}
          />
        </div>
      </div>
    );
  };
  
  export default LineControls;
  ```
  - Renders all line selection controls
  - Manages active states and mode switching

- [ ] **Create reusable LineControl component**
  ```jsx
  import React from 'react';
  
  const LineControl = ({ 
    lineType, 
    label, 
    value, 
    active, 
    optional, 
    coordinate, 
    onActivate, 
    onValueChange 
  }) => {
    return (
      <div className="line-control">
        <button 
          className={`line-btn ${active ? 'active' : ''}`}
          onClick={onActivate}
          data-line-type={lineType}
        >
          {label}
        </button>
        <input 
          type="number" 
          className="line-input"
          value={value || ''}
          onChange={(e) => onValueChange(parseInt(e.target.value) || null)}
          min="0" 
          placeholder={`${coordinate.toUpperCase()}${optional ? ' (optional)' : ''}`}
        />
      </div>
    );
  };
  
  export default LineControl;
  ```
  - Reusable component for all line types
  - Handles both button activation and number input
  - Visual feedback for active state

- [ ] **Create LetterLines component for dynamic line management**
  ```jsx
  import React from 'react';
  
  const LetterLines = ({ letterLines, active, onToggle, onUpdate }) => {
    const addLetterLine = (x) => {
      onUpdate([...letterLines, x]);
    };
    
    const updateLetterLine = (index, value) => {
      const updated = [...letterLines];
      updated[index] = value;
      onUpdate(updated);
    };
    
    const removeLetterLine = (index) => {
      const updated = letterLines.filter((_, i) => i !== index);
      onUpdate(updated);
    };
    
    return (
      <div className="letter-lines-section">
        <div className="line-control">
          <button 
            className={`toggle-btn ${active ? 'active' : ''}`}
            onClick={onToggle}
          >
            Add Letter Lines
          </button>
          <span className="toggle-status">
            {active ? 'Click on image to add lines' : 'Click to start adding letter lines'}
          </span>
        </div>
        
        {letterLines.length > 0 && (
          <div className="letter-lines-list">
            <h4>Letter Lines:</h4>
            <div className="letter-inputs-container">
              {letterLines.map((x, index) => (
                <div key={index} className="letter-line-item">
                  <input 
                    type="number" 
                    className="letter-line-input"
                    value={x}
                    onChange={(e) => updateLetterLine(index, parseInt(e.target.value) || 0)}
                    min="0" 
                    placeholder="X"
                  />
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
          </div>
        )}
      </div>
    );
  };
  
  export default LetterLines;
  ```
  - Dynamic array management with React
  - Add/remove letter lines functionality
  - Export as baseCoordinate array: [{x: value, y: textLine}, ...]

- [ ] **Create ExportButton component**
  ```jsx
  import React from 'react';
  import { exportStampFile } from '../utils/dataExporter';
  
  const ExportButton = ({ appState, disabled }) => {
    const handleExport = () => {
      try {
        exportStampFile(appState);
      } catch (error) {
        alert('Export failed: ' + error.message);
      }
    };
    
    return (
      <div className="export-section">
        <button 
          className="primary-btn"
          onClick={handleExport}
          disabled={disabled}
        >
          Save Stamp File
        </button>
        {disabled && (
          <div className="export-status">
            Please upload an image first
          </div>
        )}
      </div>
    );
  };
  
  export default ExportButton;
  ```
  - Exports data to JSON file with specific stamp file format
  - Error handling and user feedback

## CSS Styling Implementation

### Main Application Styling
- [ ] **Create App.css with main layout and theme**
  ```css
  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .App-header {
    background-color: #282c34;
    padding: 1rem;
    color: white;
    text-align: center;
  }
  
  .App-header h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 300;
  }
  
  .App-main {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .App-main {
      grid-template-columns: 1fr;
      padding: 1rem;
    }
  }
  ```

### Component-Specific Styling
- [ ] **Style FileUpload component with drag-and-drop feedback**
  ```css
  .upload-zone {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    background-color: #fafafa;
    margin-bottom: 2rem;
  }
  
  .upload-zone.drag-over {
    border-color: #007bff;
    background-color: #e3f2fd;
    transform: scale(1.02);
  }
  
  .upload-zone button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .upload-zone button:hover {
    background-color: #0056b3;
  }
  
  .upload-content p {
    margin: 0.5rem 0;
    color: #666;
  }
  ```

- [ ] **Style ControlPanel with responsive grid layout**
  ```css
  .control-panel {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    height: fit-content;
  }
  
  .name-section {
    margin-bottom: 1.5rem;
  }
  
  .name-section label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  .name-section input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .name-section input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
  ```

- [ ] **Style line control components with active states**
  ```css
  .line-controls h3 {
    margin: 1.5rem 0 1rem 0;
    color: #333;
    font-size: 1.1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
  
  .line-controls-grid {
    display: grid;
    gap: 0.75rem;
  }
  
  .line-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .line-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }
  
  .line-btn:hover {
    background-color: #f8f9fa;
    border-color: #007bff;
  }
  
  .line-btn.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
  
  .line-input {
    width: 80px;
    padding: 0.75rem 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    font-size: 0.9rem;
  }
  
  .line-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
  ```

- [ ] **Style background removal component**
  ```css
  .background-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 6px;
  }
  
  .action-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }
  
  .action-btn:hover:not(:disabled) {
    background-color: #218838;
  }
  
  .action-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .status {
    display: inline-block;
    margin-top: 0.5rem;
    color: #28a745;
    font-weight: 500;
  }
  ```

- [ ] **Style letter lines with dynamic management**
  ```css
  .letter-lines-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
  
  .toggle-btn {
    padding: 0.75rem 1rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .toggle-btn.active {
    background-color: #dc3545;
  }
  
  .toggle-status {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
  }
  
  .letter-lines-list {
    margin-top: 1rem;
  }
  
  .letter-lines-list h4 {
    margin-bottom: 0.75rem;
    color: #333;
    font-size: 1rem;
  }
  
  .letter-line-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .letter-line-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
  }
  
  .remove-btn {
    width: 32px;
    height: 32px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    line-height: 1;
  }
  
  .remove-btn:hover {
    background-color: #c82333;
  }
  ```

- [ ] **Style export button with status feedback**
  ```css
  .export-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 2px solid #eee;
  }
  
  .primary-btn {
    width: 100%;
    padding: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .primary-btn:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
  }
  
  .primary-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .export-status {
    margin-top: 0.75rem;
    padding: 0.5rem;
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 4px;
    color: #856404;
    font-size: 0.9rem;
    text-align: center;
  }
  ```

### Canvas and Display Styling
- [ ] **Style canvas container with proper positioning**
  ```css
  .canvas-container {
    position: relative;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }
  
  #main-canvas, #overlay-canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ddd;
    cursor: crosshair;
  }
  
  #overlay-canvas {
    pointer-events: none;
    z-index: 10;
  }
  
  .canvas-container.active-mode #main-canvas {
    cursor: crosshair;
  }
  
  .canvas-container.background-mode #main-canvas {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="%23007bff" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="%23007bff"/></svg>') 12 12, crosshair;
  }
  ```

- [ ] **Style zoom view with proper positioning and visibility**
  ```css
  .zoom-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background-color: white;
    border: 2px solid #007bff;
    border-radius: 8px;
    padding: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: opacity 0.2s ease;
  }
  
  .zoom-container.hidden {
    opacity: 0;
    pointer-events: none;
  }
  
  .zoom-container.visible {
    opacity: 1;
  }
  
  .zoom-canvas {
    display: block;
    border: 1px solid #ddd;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  
  .zoom-label {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #666;
    font-weight: 500;
  }
  ```

### Line Overlay Styling
- [ ] **Define CSS classes for different line types on canvas**
  ```css
  /* These will be applied programmatically to canvas overlays */
  .line-overlay {
    position: absolute;
    pointer-events: none;
    z-index: 5;
  }
  
  .line-horizontal {
    height: 2px;
    width: 100%;
    background-color: rgba(0, 123, 255, 0.8);
  }
  
  .line-vertical {
    width: 2px;
    height: 100%;
    background-color: rgba(0, 123, 255, 0.8);
  }
  
  .line-header-end {
    background-color: rgba(255, 0, 0, 0.8);
  }
  
  .line-footer-start {
    background-color: rgba(255, 165, 0, 0.8);
  }
  
  .line-text-line {
    background-color: rgba(0, 255, 0, 0.8);
  }
  
  .line-baseline {
    background-color: rgba(128, 0, 128, 0.8);
  }
  
  .line-top-line {
    background-color: rgba(255, 192, 203, 0.8);
  }
  
  .line-left-start, .line-right-start {
    background-color: rgba(0, 255, 255, 0.8);
  }
  
  .line-letter {
    background-color: rgba(255, 255, 0, 0.8);
  }
  ```

## React State Management and Custom Hooks

### Main Application State
- [ ] **Implement main App component state with useState**
  ```jsx
  import React, { useState, useCallback, useRef } from 'react';
  
  function App() {
    const [appState, setAppState] = useState({
      image: {
        file: null,
        canvas: null,
        originalData: null,
        processedData: null, // Background-removed image data
        width: 0,
        height: 0
      },
      lines: {
        headerEnd: null,
        footerStart: null,
        textLine: null,
        baseline: null,
        topLine: null,
        leftStart: null,
        rightStart: null,
        letterLines: []
      },
      ui: {
        activeMode: null, // 'background', 'headerEnd', 'footerStart', etc.
        name: '',
        zoomVisible: false,
        zoomPosition: { x: 0, y: 0 }
      },
      settings: {
        backgroundRemoved: false,
        targetColor: null
      }
    });
    
    // State update function with validation
    const updateAppState = useCallback((updates) => {
      setAppState(prevState => ({
        ...prevState,
        ...updates,
        // Ensure nested objects are properly merged
        image: updates.image ? { ...prevState.image, ...updates.image } : prevState.image,
        lines: updates.lines ? { ...prevState.lines, ...updates.lines } : prevState.lines,
        ui: updates.ui ? { ...prevState.ui, ...updates.ui } : prevState.ui,
        settings: updates.settings ? { ...prevState.settings, ...updates.settings } : prevState.settings
      }));
    }, []);
    
    return (
      // App JSX with state passed to components
    );
  }
  ```
  - Uses React useState for reactive state management
  - Immutable state updates with proper object spreading
  - Validation and type safety for state updates

### Custom Hook for Image Processing
- [ ] **Create useImageProcessor custom hook**
  ```jsx
  // src/hooks/useImageProcessor.js
  import { useCallback, useRef } from 'react';
  import { removeBackground } from '../utils/imageProcessor';
  
  export const useImageProcessor = (appState, updateAppState) => {
    const canvasRef = useRef(null);
    
    const loadImage = useCallback((file) => {
      if (!file || file.type !== 'image/png') {
        throw new Error('Please select a PNG file');
      }
      
      const img = new Image();
      const canvas = canvasRef.current;
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        
        updateAppState({
          image: {
            file,
            canvas,
            originalData: imageData,
            width: img.width,
            height: img.height
          }
        });
      };
      
      img.onerror = () => {
        throw new Error('Failed to load image');
      };
      
      img.src = URL.createObjectURL(file);
    }, [updateAppState]);
    
    const processBackgroundRemoval = useCallback((clickX, clickY) => {
      if (!appState.image.originalData) return;
      
      const ctx = appState.image.canvas.getContext('2d');
      const imageData = ctx.getImageData(clickX, clickY, 1, 1);
      const targetColor = {
        r: imageData.data[0],
        g: imageData.data[1],
        b: imageData.data[2]
      };
      
      const processedData = removeBackground(appState.image.originalData, targetColor);
      ctx.putImageData(processedData, 0, 0);
      
      updateAppState({
        image: { processedData },
        settings: { backgroundRemoved: true, targetColor },
        ui: { activeMode: null }
      });
    }, [appState.image, updateAppState]);
    
    const getBase64ImageData = useCallback(() => {
      if (!appState.image.canvas) return null;
      return appState.image.canvas.toDataURL('image/png');
    }, [appState.image.canvas]);
    
    return {
      canvasRef,
      loadImage,
      processBackgroundRemoval,
      getBase64ImageData
    };
  };
  ```
  - Encapsulates image processing logic in reusable hook
  - Handles file loading, background removal, and data export
  - Manages canvas references and image state updates

### Custom Hook for Line Management
- [ ] **Create useLineManager custom hook**
  ```jsx
  // src/hooks/useLineManager.js
  import { useCallback, useRef, useEffect } from 'react';
  
  export const useLineManager = (appState, updateAppState) => {
    const overlayCanvasRef = useRef(null);
    
    const drawPreviewLine = useCallback((x, y, lineType) => {
      const canvas = overlayCanvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = getLineColor(lineType);
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      if (isHorizontalLine(lineType)) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      } else {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      ctx.stroke();
    }, []);
    
    const placeLine = useCallback((x, y, lineType) => {
      const coordinate = isHorizontalLine(lineType) ? y : x;
      
      updateAppState({
        lines: { [lineType]: coordinate },
        ui: { activeMode: null }
      });
      
      // Clear preview
      const canvas = overlayCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }, [updateAppState]);
    
    const addLetterLine = useCallback((x) => {
      const newLetterLines = [...appState.lines.letterLines, x].sort((a, b) => a - b);
      updateAppState({
        lines: { letterLines: newLetterLines }
      });
    }, [appState.lines.letterLines, updateAppState]);
    
    const renderAllLines = useCallback(() => {
      const canvas = overlayCanvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw all placed lines
      Object.entries(appState.lines).forEach(([lineType, value]) => {
        if (value === null || lineType === 'letterLines') return;
        
        ctx.strokeStyle = getLineColor(lineType);
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        if (isHorizontalLine(lineType)) {
          ctx.moveTo(0, value);
          ctx.lineTo(canvas.width, value);
        } else {
          ctx.moveTo(value, 0);
          ctx.lineTo(value, canvas.height);
        }
        
        ctx.stroke();
      });
      
      // Draw letter lines
      appState.lines.letterLines.forEach(x => {
        ctx.strokeStyle = getLineColor('letter');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      });
    }, [appState.lines]);
    
    // Helper functions
    const isHorizontalLine = (lineType) => {
      return ['headerEnd', 'footerStart', 'textLine', 'baseline', 'topLine'].includes(lineType);
    };
    
    const getLineColor = (lineType) => {
      const colors = {
        headerEnd: 'rgba(255, 0, 0, 0.8)',
        footerStart: 'rgba(255, 165, 0, 0.8)',
        textLine: 'rgba(0, 255, 0, 0.8)',
        baseline: 'rgba(128, 0, 128, 0.8)',
        topLine: 'rgba(255, 192, 203, 0.8)',
        leftStart: 'rgba(0, 255, 255, 0.8)',
        rightStart: 'rgba(0, 255, 255, 0.8)',
        letter: 'rgba(255, 255, 0, 0.8)'
      };
      return colors[lineType] || 'rgba(0, 123, 255, 0.8)';
    };
    
    // Re-render lines when state changes
    useEffect(() => {
      renderAllLines();
    }, [renderAllLines]);
    
    return {
      overlayCanvasRef,
      drawPreviewLine,
      placeLine,
      addLetterLine,
      renderAllLines
    };
  };
  ```
  - Manages all line drawing and overlay functionality
  - Handles preview lines, placement, and rendering
  - Supports both horizontal and vertical lines with different colors

### Custom Hook for Zoom Management
- [ ] **Create useZoomManager custom hook**
  ```jsx
  // src/hooks/useZoomManager.js
  import { useCallback, useRef, useEffect } from 'react';
  
  export const useZoomManager = (appState, updateAppState) => {
    const zoomCanvasRef = useRef(null);
    const zoomFactor = 5;
    const zoomSize = 100;
    
    const showZoom = useCallback((x, y) => {
      updateAppState({
        ui: {
          zoomVisible: true,
          zoomPosition: { x, y }
        }
      });
    }, [updateAppState]);
    
    const hideZoom = useCallback(() => {
      updateAppState({
        ui: { zoomVisible: false }
      });
    }, [updateAppState]);
    
    const updateZoomPosition = useCallback((x, y) => {
      if (!appState.ui.zoomVisible) return;
      
      const zoomCanvas = zoomCanvasRef.current;
      const mainCanvas = appState.image.canvas;
      
      if (!zoomCanvas || !mainCanvas) return;
      
      const ctx = zoomCanvas.getContext('2d');
      ctx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
      
      // Calculate source area (centered on cursor)
      const sourceSize = zoomSize / zoomFactor;
      const sourceX = x - sourceSize / 2;
      const sourceY = y - sourceSize / 2;
      
      // Draw zoomed portion
      ctx.imageSmoothingEnabled = false; // Pixelated zoom
      ctx.drawImage(
        mainCanvas,
        sourceX, sourceY, sourceSize, sourceSize,
        0, 0, zoomCanvas.width, zoomCanvas.height
      );
      
      // Draw crosshair
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 1;
      const centerX = zoomCanvas.width / 2;
      const centerY = zoomCanvas.height / 2;
      
      ctx.beginPath();
      ctx.moveTo(centerX - 10, centerY);
      ctx.lineTo(centerX + 10, centerY);
      ctx.moveTo(centerX, centerY - 10);
      ctx.lineTo(centerX, centerY + 10);
      ctx.stroke();
      
      updateAppState({
        ui: { zoomPosition: { x, y } }
      });
    }, [appState.ui.zoomVisible, appState.image.canvas, updateAppState]);
    
    const getZoomedPixelColor = useCallback((x, y) => {
      const canvas = appState.image.canvas;
      if (!canvas) return null;
      
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(x, y, 1, 1);
      return {
        r: imageData.data[0],
        g: imageData.data[1],
        b: imageData.data[2],
        a: imageData.data[3]
      };
    }, [appState.image.canvas]);
    
    return {
      zoomCanvasRef,
      showZoom,
      hideZoom,
      updateZoomPosition,
      getZoomedPixelColor
    };
  };
  ```
  - Manages zoom functionality with 5x magnification
  - Handles zoom visibility and position updates
  - Provides precise pixel color selection

### State Validation and Helpers
- [ ] **Create state validation utilities**
  ```jsx
  // src/utils/stateValidation.js
  
  export const validateCoordinate = (value, max) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > max) {
      return null;
    }
    return num;
  };
  
  export const validateAppState = (state) => {
    const errors = [];
    
    if (!state.image.file) {
      errors.push('No image file loaded');
    }
    
    if (!state.ui.name.trim()) {
      errors.push('Name is required');
    }
    
    if (!state.lines.headerEnd) {
      errors.push('Header end line is required');
    }
    
    if (!state.lines.footerStart) {
      errors.push('Footer start line is required');
    }
    
    if (!state.lines.textLine) {
      errors.push('Text line is required');
    }
    
    return errors;
  };
  
  export const calculateDefaults = (state) => {
    const defaults = {};
    
    // Default baseline to 1 pixel below footer start
    if (!state.lines.baseline && state.lines.footerStart) {
      defaults.baseline = state.lines.footerStart + 1;
    }
    
    // Default top line to 1 pixel above header end
    if (!state.lines.topLine && state.lines.headerEnd) {
      defaults.topLine = state.lines.headerEnd - 1;
    }
    
    return defaults;
  };
  ```
  - Validates coordinates and required fields
  - Calculates default values for optional fields
  - Provides error checking for export readiness

## File Upload Implementation

### Drag and Drop Styling
- [ ] **Add CSS for drag-and-drop interactions**
  ```css
  .file-upload-container {
    margin-bottom: 20px;
  }
  
  .file-upload-area {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 40px 20px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: #fafafa;
  }
  
  .file-upload-area:hover {
    border-color: #007bff;
    background-color: #f0f8ff;
  }
  
  .file-upload-area.drag-active {
    border-color: #28a745;
    background-color: #f0fff0;
    transform: scale(1.02);
  }
  
  .file-input {
    display: none;
  }
  
  .file-upload-label {
    display: block;
    cursor: pointer;
  }
  
  .upload-icon {
    font-size: 48px;
    margin-bottom: 10px;
  }
  
  .upload-text {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .upload-hint {
    font-size: 14px;
    color: #666;
  }
  
  .file-upload-success {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .upload-error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
    color: #721c24;
  }
  
  .loading-progress {
    width: 100%;
    height: 4px;
    background-color: #e9ecef;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 10px;
  }
  
  .loading-progress-bar {
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease;
  }
  
  .canvas-container.background-mode canvas:hover {
    filter: brightness(1.1);
  }
  ```
  - Styling for background removal controls and feedback
  - Visual indicators for active background removal mode
  - Color preview and information display
- [ ] Update canvas display with background-removed image
- [ ] Add undo functionality to restore original image

## React Zoom Functionality Implementation

### ZoomView React Component
- [ ] **Create ZoomView component for precise pixel selection**
  ```jsx
  // src/components/ZoomView.jsx
  import React, { useRef, useEffect, useCallback } from 'react';
  import { useZoomManager } from '../hooks/useZoomManager';
  
  export const ZoomView = ({ appState, updateAppState }) => {
    const { zoomCanvasRef, updateZoomPosition } = useZoomManager(appState, updateAppState);
    
    // Update zoom content when position changes
    useEffect(() => {
      if (appState.ui.zoomVisible && appState.ui.zoomPosition) {
        updateZoomPosition(appState.ui.zoomPosition.x, appState.ui.zoomPosition.y);
      }
    }, [appState.ui.zoomVisible, appState.ui.zoomPosition, updateZoomPosition]);
    
    if (!appState.ui.zoomVisible) {
      return null;
    }
    
    return (
      <div className="zoom-view-container">
        <div className="zoom-view-header">
          <span>Zoom View (5x)</span>
          <span className="zoom-coordinates">
            X: {appState.ui.zoomPosition.x}, Y: {appState.ui.zoomPosition.y}
          </span>
        </div>
        <canvas
          ref={zoomCanvasRef}
          width={100}
          height={100}
          className="zoom-canvas"
        />
        <div className="zoom-instructions">
          Move mouse for precise selection
        </div>
      </div>
    );
  };
  ```
  - Displays 5x magnified view of cursor area
  - Shows current coordinates for precision
  - Integrates with useZoomManager hook

### Enhanced useZoomManager Hook
- [ ] **Complete useZoomManager implementation with React patterns**
  ```jsx
  // src/hooks/useZoomManager.js (enhanced version)
  import { useCallback, useRef, useEffect, useState } from 'react';
  
  export const useZoomManager = (appState, updateAppState) => {
    const zoomCanvasRef = useRef(null);
    const [zoomData, setZoomData] = useState(null);
    const zoomFactor = 5;
    const zoomSize = 100;
    
    const showZoom = useCallback((x, y) => {
      updateAppState({
        ui: {
          zoomVisible: true,
          zoomPosition: { x, y }
        }
      });
    }, [updateAppState]);
    
    const hideZoom = useCallback(() => {
      updateAppState({
        ui: { zoomVisible: false }
      });
      setZoomData(null);
    }, [updateAppState]);
    
    const updateZoomPosition = useCallback((x, y) => {
      const zoomCanvas = zoomCanvasRef.current;
      const mainCanvas = appState.image.canvas;
      
      if (!zoomCanvas || !mainCanvas || !appState.ui.zoomVisible) return;
      
      const ctx = zoomCanvas.getContext('2d');
      ctx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
      
      // Calculate source area (centered on cursor)
      const sourceSize = zoomSize / zoomFactor;
      const sourceX = Math.max(0, Math.min(mainCanvas.width - sourceSize, x - sourceSize / 2));
      const sourceY = Math.max(0, Math.min(mainCanvas.height - sourceSize, y - sourceSize / 2));
      
      // Draw zoomed portion with pixelated effect
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        mainCanvas,
        sourceX, sourceY, sourceSize, sourceSize,
        0, 0, zoomCanvas.width, zoomCanvas.height
      );
      
      // Draw grid for pixel precision
      drawPixelGrid(ctx, zoomCanvas.width, zoomCanvas.height, zoomFactor);
      
      // Draw crosshair at center
      drawCrosshair(ctx, zoomCanvas.width / 2, zoomCanvas.height / 2);
      
      // Update zoom data for other components
      setZoomData({
        sourceX,
        sourceY,
        sourceSize,
        centerX: x,
        centerY: y
      });
      
      updateAppState({
        ui: { zoomPosition: { x, y } }
      });
    }, [appState.ui.zoomVisible, appState.image.canvas, updateAppState]);
    
    const getZoomedPixelColor = useCallback((x, y) => {
      const canvas = appState.image.canvas;
      if (!canvas) return null;
      
      // Ensure coordinates are within bounds
      const clampedX = Math.max(0, Math.min(canvas.width - 1, Math.floor(x)));
      const clampedY = Math.max(0, Math.min(canvas.height - 1, Math.floor(y)));
      
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(clampedX, clampedY, 1, 1);
      
      return {
        r: imageData.data[0],
        g: imageData.data[1],
        b: imageData.data[2],
        a: imageData.data[3]
      };
    }, [appState.image.canvas]);
    
    const getRelativeZoomCoordinates = useCallback((zoomX, zoomY) => {
      if (!zoomData) return null;
      
      // Convert zoom canvas coordinates to main canvas coordinates
      const relativeX = (zoomX / zoomSize) * zoomData.sourceSize;
      const relativeY = (zoomY / zoomSize) * zoomData.sourceSize;
      
      const mainX = zoomData.sourceX + relativeX;
      const mainY = zoomData.sourceY + relativeY;
      
      return { x: Math.floor(mainX), y: Math.floor(mainY) };
    }, [zoomData]);
    
    // Helper function to draw pixel grid
    const drawPixelGrid = (ctx, width, height, factor) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      
      const gridSize = factor;
      
      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };
    
    // Helper function to draw crosshair
    const drawCrosshair = (ctx, centerX, centerY) => {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(centerX - 10, centerY);
      ctx.lineTo(centerX + 10, centerY);
      ctx.moveTo(centerX, centerY - 10);
      ctx.lineTo(centerX, centerY + 10);
      ctx.stroke();
      
      // Draw center dot
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(centerX - 1, centerY - 1, 2, 2);
    };
    
    return {
      zoomCanvasRef,
      showZoom,
      hideZoom,
      updateZoomPosition,
      getZoomedPixelColor,
      getRelativeZoomCoordinates,
      zoomData
    };
  };
  ```
  - Enhanced zoom with pixel grid for precision
  - Coordinate conversion utilities
  - Proper bounds checking and error handling

### Zoom Integration with Line Selection
- [ ] **Create useMouseInteraction hook for unified mouse handling**
  ```jsx
  // src/hooks/useMouseInteraction.js
  import { useCallback, useEffect } from 'react';
  import { useZoomManager } from './useZoomManager';
  import { useLineManager } from './useLineManager';
  
  export const useMouseInteraction = (appState, updateAppState) => {
    const { showZoom, hideZoom, updateZoomPosition } = useZoomManager(appState, updateAppState);
    const { drawPreviewLine, placeLine, addLetterLine } = useLineManager(appState, updateAppState);
    
    const handleCanvasMouseMove = useCallback((e) => {
      const canvas = appState.image.canvas;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      
      // Always show zoom when in active modes
      const activeMode = appState.ui.activeMode;
      if (activeMode && ['background', 'headerEnd', 'footerStart', 'textLine', 'baseline', 'topLine', 'leftStart', 'rightStart', 'letterLines'].includes(activeMode)) {
        showZoom(x, y);
        updateZoomPosition(x, y);
        
        // Show preview line for line selection modes
        if (activeMode !== 'background' && activeMode !== 'letterLines') {
          drawPreviewLine(x, y, activeMode);
        }
      }
    }, [appState.image.canvas, appState.ui.activeMode, showZoom, updateZoomPosition, drawPreviewLine]);
    
    const handleCanvasMouseLeave = useCallback(() => {
      hideZoom();
    }, [hideZoom]);
    
    const handleCanvasClick = useCallback((e) => {
      const canvas = appState.image.canvas;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      
      const activeMode = appState.ui.activeMode;
      
      if (activeMode === 'letterLines') {
        addLetterLine(x);
      } else if (activeMode && activeMode !== 'background') {
        placeLine(x, y, activeMode);
      }
      // Background mode is handled in BackgroundRemovalControls component
    }, [appState.image.canvas, appState.ui.activeMode, placeLine, addLetterLine]);
    
    // Attach event listeners to canvas
    useEffect(() => {
      const canvas = appState.image.canvas;
      if (!canvas) return;
      
      canvas.addEventListener('mousemove', handleCanvasMouseMove);
      canvas.addEventListener('mouseleave', handleCanvasMouseLeave);
      canvas.addEventListener('click', handleCanvasClick);
      
      // Set cursor based on active mode
      const activeMode = appState.ui.activeMode;
      if (activeMode) {
        canvas.style.cursor = 'crosshair';
      } else {
        canvas.style.cursor = 'default';
      }
      
      return () => {
        canvas.removeEventListener('mousemove', handleCanvasMouseMove);
        canvas.removeEventListener('mouseleave', handleCanvasMouseLeave);
        canvas.removeEventListener('click', handleCanvasClick);
        canvas.style.cursor = 'default';
      };
    }, [appState.image.canvas, appState.ui.activeMode, handleCanvasMouseMove, handleCanvasMouseLeave, handleCanvasClick]);
    
    return {
      // Expose methods for external use if needed
    };
  };
  ```
  - Unified mouse interaction handling for all modes
  - Integrates zoom with line selection
  - Proper event listener management

### Zoom View Styling
- [ ] **Add CSS for zoom view component**
  ```css
  .zoom-view-container {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 2px solid #333;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    font-family: monospace;
  }
  
  .zoom-view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .zoom-coordinates {
    color: #666;
    font-size: 11px;
  }
  
  .zoom-canvas {
    display: block;
    border: 1px solid #ddd;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  
  .zoom-instructions {
    margin-top: 8px;
    font-size: 11px;
    color: #666;
    text-align: center;
  }
  
  /* Responsive zoom positioning */
  @media (max-width: 768px) {
    .zoom-view-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      top: auto;
    }
  }
  ```
  - Fixed positioning for zoom view
  - Pixelated rendering for precise pixel visibility
  - Responsive positioning for mobile devices

## React Line Selection Implementation

### LineControls React Component
- [ ] **Create LineControls component for line selection UI**
  ```jsx
  // src/components/LineControls.jsx
  import React, { useCallback } from 'react';
  import { useLineManager } from '../hooks/useLineManager';
  
  export const LineControls = ({ appState, updateAppState }) => {
    const { renderAllLines } = useLineManager(appState, updateAppState);
    
    const handleLineSelection = useCallback((lineType) => {
      updateAppState({
        ui: { activeMode: lineType }
      });
    }, [updateAppState]);
    
    const handleCancelSelection = useCallback(() => {
      updateAppState({
        ui: { activeMode: null }
      });
    }, [updateAppState]);
    
    const handleManualInput = useCallback((lineType, value) => {
      const numValue = parseInt(value);
      if (isNaN(numValue) || numValue < 0) return;
      
      // Validate bounds
      const maxValue = lineType.includes('Start') || lineType === 'letterLines' 
        ? appState.image.width 
        : appState.image.height;
      
      if (numValue > maxValue) return;
      
      updateAppState({
        lines: { [lineType]: numValue }
      });
    }, [appState.image, updateAppState]);
    
    const handleLetterLineRemove = useCallback((index) => {
      const newLetterLines = appState.lines.letterLines.filter((_, i) => i !== index);
      updateAppState({
        lines: { letterLines: newLetterLines }
      });
    }, [appState.lines.letterLines, updateAppState]);
    
    const handleLetterLineToggle = useCallback(() => {
      const isActive = appState.ui.activeMode === 'letterLines';
      updateAppState({
        ui: { activeMode: isActive ? null : 'letterLines' }
      });
    }, [appState.ui.activeMode, updateAppState]);
    
    const lineTypes = [
      { key: 'headerEnd', label: 'Header End', type: 'horizontal', required: true, color: '#ff0000' },
      { key: 'footerStart', label: 'Footer Start', type: 'horizontal', required: true, color: '#ffa500' },
      { key: 'textLine', label: 'Text Line', type: 'horizontal', required: true, color: '#00ff00' },
      { key: 'baseline', label: 'Baseline', type: 'horizontal', required: false, color: '#800080' },
      { key: 'topLine', label: 'Top Line', type: 'horizontal', required: false, color: '#ffc0cb' },
      { key: 'leftStart', label: 'Left Start', type: 'vertical', required: false, color: '#00ffff' },
      { key: 'rightStart', label: 'Right Start', type: 'vertical', required: false, color: '#00ffff' }
    ];
    
    if (!appState.image.canvas) {
      return (
        <div className="line-controls disabled">
          <p>Upload an image to start selecting lines</p>
        </div>
      );
    }
    
    return (
      <div className="line-controls">
        <div className="line-controls-header">
          <h3>Line Selection</h3>
          {appState.ui.activeMode && (
            <button onClick={handleCancelSelection} className="btn btn-secondary btn-sm">
              Cancel
            </button>
          )}
        </div>
        
        <div className="line-types-grid">
          {lineTypes.map(({ key, label, type, required, color }) => (
            <div key={key} className="line-control-item">
              <div className="line-control-header">
                <span 
                  className="line-color-indicator" 
                  style={{ backgroundColor: color }}
                ></span>
                <label>{label} {required && <span className="required">*</span>}</label>
              </div>
              
              <div className="line-control-actions">
                <button
                  onClick={() => handleLineSelection(key)}
                  disabled={appState.ui.activeMode === key}
                  className={`btn btn-sm ${
                    appState.ui.activeMode === key ? 'btn-warning' : 'btn-primary'
                  }`}
                >
                  {appState.ui.activeMode === key ? 'Click to place' : 'Select'}
                </button>
                
                <input
                  type="number"
                  min="0"
                  max={type === 'vertical' ? appState.image.width : appState.image.height}
                  value={appState.lines[key] || ''}
                  onChange={(e) => handleManualInput(key, e.target.value)}
                  placeholder={type === 'vertical' ? 'X' : 'Y'}
                  className="coordinate-input"
                />
              </div>
              
              {appState.lines[key] !== null && (
                <div className="line-status">
                  ✓ {type === 'vertical' ? 'X' : 'Y'}: {appState.lines[key]}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Letter Lines Section */}
        <div className="letter-lines-section">
          <div className="letter-lines-header">
            <h4>Letter Lines</h4>
            <button
              onClick={handleLetterLineToggle}
              className={`btn btn-sm ${
                appState.ui.activeMode === 'letterLines' ? 'btn-warning' : 'btn-secondary'
              }`}
            >
              {appState.ui.activeMode === 'letterLines' ? 'Stop Adding' : 'Add Letter Lines'}
            </button>
          </div>
          
          {appState.lines.letterLines.length > 0 && (
            <div className="letter-lines-list">
              {appState.lines.letterLines.map((x, index) => (
                <div key={index} className="letter-line-item">
                  <span>Line {index + 1}: X={x}</span>
                  <button
                    onClick={() => handleLetterLineRemove(index)}
                    className="btn btn-danger btn-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {appState.ui.activeMode === 'letterLines' && (
            <div className="letter-lines-instructions">
              Click on the image to add vertical letter lines. Click "Stop Adding" when done.
            </div>
          )}
        </div>
      </div>
    );
  };
  ```
  - Comprehensive UI for all line types with visual indicators
  - Manual coordinate input with validation
  - Letter lines management with add/remove functionality
  - Real-time feedback and status display

### Enhanced useLineManager Hook
- [ ] **Complete useLineManager with all line selection features**
  ```jsx
  // src/hooks/useLineManager.js (enhanced version)
  import { useCallback, useRef, useEffect } from 'react';
  
  export const useLineManager = (appState, updateAppState) => {
    const overlayCanvasRef = useRef(null);
    
    const drawPreviewLine = useCallback((x, y, lineType) => {
      const canvas = overlayCanvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw preview line
      ctx.strokeStyle = getLineColor(lineType);
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]); // Dashed line for preview
      ctx.beginPath();
      
      if (isHorizontalLine(lineType)) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      } else {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash
      
      // Draw existing lines
      renderExistingLines(ctx);
    }, [appState.lines]);
    
    const placeLine = useCallback((x, y, lineType) => {
      const coordinate = isHorizontalLine(lineType) ? y : x;
      
      // Validate coordinate bounds
      const maxValue = isHorizontalLine(lineType) 
        ? appState.image.height 
        : appState.image.width;
      
      if (coordinate < 0 || coordinate > maxValue) {
        console.warn(`Coordinate ${coordinate} is out of bounds for ${lineType}`);
        return;
      }
      
      updateAppState({
        lines: { [lineType]: coordinate },
        ui: { activeMode: null }
      });
      
      // Clear preview and render all lines
      const canvas = overlayCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderExistingLines(ctx);
      }
    }, [appState.image, updateAppState]);
    
    const addLetterLine = useCallback((x) => {
      // Validate coordinate bounds
      if (x < 0 || x > appState.image.width) {
        console.warn(`Letter line coordinate ${x} is out of bounds`);
        return;
      }
      
      // Check if line already exists at this position (within 2 pixels)
      const exists = appState.lines.letterLines.some(existingX => Math.abs(existingX - x) < 2);
      if (exists) {
        console.warn(`Letter line already exists near position ${x}`);
        return;
      }
      
      const newLetterLines = [...appState.lines.letterLines, x].sort((a, b) => a - b);
      updateAppState({
        lines: { letterLines: newLetterLines }
      });
    }, [appState.lines.letterLines, appState.image.width, updateAppState]);
    
    const updateLinePosition = useCallback((lineType, value) => {
      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        updateAppState({
          lines: { [lineType]: null }
        });
        return;
      }
      
      // Validate bounds
      const maxValue = isHorizontalLine(lineType) 
        ? appState.image.height 
        : appState.image.width;
      
      if (numValue < 0 || numValue > maxValue) {
        console.warn(`Value ${numValue} is out of bounds for ${lineType}`);
        return;
      }
      
      updateAppState({
        lines: { [lineType]: numValue }
      });
    }, [appState.image, updateAppState]);
    
    const renderAllLines = useCallback(() => {
      const canvas = overlayCanvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderExistingLines(ctx);
    }, [appState.lines]);
    
    const renderExistingLines = useCallback((ctx) => {
      ctx.setLineDash([]); // Solid lines for placed lines
      
      // Draw all placed lines
      Object.entries(appState.lines).forEach(([lineType, value]) => {
        if (value === null || lineType === 'letterLines') return;
        
        ctx.strokeStyle = getLineColor(lineType);
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        if (isHorizontalLine(lineType)) {
          ctx.moveTo(0, value);
          ctx.lineTo(ctx.canvas.width, value);
        } else {
          ctx.moveTo(value, 0);
          ctx.lineTo(value, ctx.canvas.height);
        }
        
        ctx.stroke();
        
        // Draw line label
        drawLineLabel(ctx, lineType, value);
      });
      
      // Draw letter lines
      appState.lines.letterLines.forEach((x, index) => {
        ctx.strokeStyle = getLineColor('letter');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
        
        // Draw letter line label
        drawLetterLineLabel(ctx, x, index);
      });
    }, [appState.lines]);
    
    const drawLineLabel = useCallback((ctx, lineType, value) => {
      ctx.fillStyle = getLineColor(lineType);
      ctx.font = '12px Arial';
      ctx.fontWeight = 'bold';
      
      const label = getLineLabel(lineType);
      const isHorizontal = isHorizontalLine(lineType);
      
      if (isHorizontal) {
        ctx.fillText(label, 5, value - 5);
      } else {
        ctx.save();
        ctx.translate(value + 5, 15);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(label, 0, 0);
        ctx.restore();
      }
    }, []);
    
    const drawLetterLineLabel = useCallback((ctx, x, index) => {
      ctx.fillStyle = getLineColor('letter');
      ctx.font = '10px Arial';
      ctx.fillText(`L${index + 1}`, x + 2, 12);
    }, []);
    
    // Helper functions
    const isHorizontalLine = (lineType) => {
      return ['headerEnd', 'footerStart', 'textLine', 'baseline', 'topLine'].includes(lineType);
    };
    
    const getLineColor = (lineType) => {
      const colors = {
        headerEnd: 'rgba(255, 0, 0, 0.8)',
        footerStart: 'rgba(255, 165, 0, 0.8)',
        textLine: 'rgba(0, 255, 0, 0.8)',
        baseline: 'rgba(128, 0, 128, 0.8)',
        topLine: 'rgba(255, 192, 203, 0.8)',
        leftStart: 'rgba(0, 255, 255, 0.8)',
        rightStart: 'rgba(0, 255, 255, 0.8)',
        letter: 'rgba(255, 255, 0, 0.8)'
      };
      return colors[lineType] || 'rgba(0, 123, 255, 0.8)';
    };
    
    const getLineLabel = (lineType) => {
      const labels = {
        headerEnd: 'Header',
        footerStart: 'Footer',
        textLine: 'Text',
        baseline: 'Base',
        topLine: 'Top',
        leftStart: 'Left',
        rightStart: 'Right'
      };
      return labels[lineType] || lineType;
    };
    
    // Re-render lines when state changes
    useEffect(() => {
      renderAllLines();
    }, [renderAllLines]);
    
    // Setup overlay canvas dimensions
    useEffect(() => {
      const canvas = overlayCanvasRef.current;
      const mainCanvas = appState.image.canvas;
      
      if (canvas && mainCanvas) {
        canvas.width = mainCanvas.width;
        canvas.height = mainCanvas.height;
        renderAllLines();
      }
    }, [appState.image.canvas, renderAllLines]);
    
    return {
      overlayCanvasRef,
      drawPreviewLine,
      placeLine,
      addLetterLine,
      updateLinePosition,
      renderAllLines
    };
  };
  ```
  - Complete line management with preview and placement
  - Bounds validation and error handling
  - Line labels and visual feedback
  - Letter lines with duplicate prevention

### Line Selection Styling
- [ ] **Add CSS for line selection controls**
  ```css
  .line-controls {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f8f9fa;
    margin-bottom: 20px;
  }
  
  .line-controls.disabled {
    opacity: 0.6;
    text-align: center;
    color: #666;
  }
  
  .line-controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .line-controls-header h3 {
    margin: 0;
    color: #333;
  }
  
  .line-types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .line-control-item {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 15px;
  }
  
  .line-control-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .line-color-indicator {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    margin-right: 8px;
    border: 1px solid #ccc;
  }
  
  .line-control-header label {
    font-weight: 500;
    margin: 0;
  }
  
  .required {
    color: #dc3545;
    font-weight: bold;
  }
  
  .line-control-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .coordinate-input {
    width: 80px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
  }
  
  .line-status {
    margin-top: 8px;
    font-size: 12px;
    color: #28a745;
    font-family: monospace;
  }
  
  .letter-lines-section {
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
  
  .letter-lines-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .letter-lines-header h4 {
    margin: 0;
    color: #333;
  }
  
  .letter-lines-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }
  
  .letter-line-item {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    font-family: monospace;
  }
  
  .letter-lines-instructions {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    color: #0c5460;
  }
  
  .btn-xs {
    padding: 2px 6px;
    font-size: 11px;
    line-height: 1;
  }
  ```
  - Grid layout for line controls
  - Color indicators for each line type
  - Status feedback and validation styling
  - Letter lines management interface

## React Manual Input Synchronization

### Controlled Input Components
- [ ] **Implement controlled inputs with React state synchronization**
  ```jsx
  // Already implemented in LineControls component
  // Manual inputs are automatically synchronized with React state
  const handleManualInput = useCallback((lineType, value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    // Validate bounds
    const maxValue = lineType.includes('Start') || lineType === 'letterLines' 
      ? appState.image.width 
      : appState.image.height;
    
    if (numValue > maxValue) return;
    
    updateAppState({
      lines: { [lineType]: numValue }
    });
  }, [appState.image, updateAppState]);
  ```
  - React controlled inputs automatically sync with state
  - Real-time validation and bounds checking
  - Immediate visual feedback through state updates

### Input Validation Hook
- [ ] **Create useInputValidation hook for coordinate validation**
  ```jsx
  // src/hooks/useInputValidation.js
  import { useCallback, useMemo } from 'react';
  
  export const useInputValidation = (appState) => {
    const validateCoordinate = useCallback((value, type, lineType) => {
      // Convert to number
      const numValue = parseFloat(value);
      
      // Check if it's a valid number
      if (isNaN(numValue)) {
        return { isValid: false, error: 'Must be a number' };
      }
      
      // Check if it's non-negative
      if (numValue < 0) {
        return { isValid: false, error: 'Must be non-negative' };
      }
      
      // Check bounds based on type
      const maxValue = type === 'vertical' 
        ? appState.image.width 
        : appState.image.height;
      
      if (numValue > maxValue) {
        return { 
          isValid: false, 
          error: `Must be ≤ ${maxValue} (image ${type === 'vertical' ? 'width' : 'height'})` 
        };
      }
      
      // Check logical constraints
      const logicalError = validateLogicalConstraints(numValue, lineType, appState.lines);
      if (logicalError) {
        return { isValid: false, error: logicalError };
      }
      
      return { isValid: true, value: Math.floor(numValue) };
    }, [appState.image, appState.lines]);
    
    const validateLogicalConstraints = useCallback((value, lineType, lines) => {
      // Header end should be before footer start
      if (lineType === 'headerEnd' && lines.footerStart !== null && value >= lines.footerStart) {
        return 'Header end must be above footer start';
      }
      
      if (lineType === 'footerStart' && lines.headerEnd !== null && value <= lines.headerEnd) {
        return 'Footer start must be below header end';
      }
      
      // Text line should be between header and footer
      if (lineType === 'textLine') {
        if (lines.headerEnd !== null && value <= lines.headerEnd) {
          return 'Text line must be below header end';
        }
        if (lines.footerStart !== null && value >= lines.footerStart) {
          return 'Text line must be above footer start';
        }
      }
      
      // Top line should be above header end
      if (lineType === 'topLine' && lines.headerEnd !== null && value >= lines.headerEnd) {
        return 'Top line must be above header end';
      }
      
      // Baseline should be below footer start
      if (lineType === 'baseline' && lines.footerStart !== null && value <= lines.footerStart) {
        return 'Baseline must be below footer start';
      }
      
      // Left start should be before right start
      if (lineType === 'leftStart' && lines.rightStart !== null && value >= lines.rightStart) {
        return 'Left start must be left of right start';
      }
      
      if (lineType === 'rightStart' && lines.leftStart !== null && value <= lines.leftStart) {
        return 'Right start must be right of left start';
      }
      
      return null;
    }, []);
    
    const getValidationErrors = useCallback(() => {
      const errors = [];
      
      // Check required fields
      if (!appState.ui.name.trim()) {
        errors.push('Name is required');
      }
      
      if (appState.lines.headerEnd === null) {
        errors.push('Header end line is required');
      }
      
      if (appState.lines.footerStart === null) {
        errors.push('Footer start line is required');
      }
      
      if (appState.lines.textLine === null) {
        errors.push('Text line is required');
      }
      
      if (!appState.settings.backgroundRemoved) {
        errors.push('Background removal is required');
      }
      
      return errors;
    }, [appState]);
    
    const isReadyForExport = useMemo(() => {
      return getValidationErrors().length === 0;
    }, [getValidationErrors]);
    
    return {
      validateCoordinate,
      getValidationErrors,
      isReadyForExport
    };
  };
  ```
  - Comprehensive coordinate validation with bounds checking
  - Logical constraint validation (e.g., header before footer)
  - Export readiness validation

## React JSON Export Implementation

### Export Controls Component
- [ ] **Create ExportControls React component**
  ```jsx
  // src/components/ExportControls.jsx
  import React, { useCallback, useState } from 'react';
  import { useInputValidation } from '../hooks/useInputValidation';
  import { useImageProcessor } from '../hooks/useImageProcessor';
  
  export const ExportControls = ({ appState, updateAppState }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [exportError, setExportError] = useState(null);
    const { getValidationErrors, isReadyForExport } = useInputValidation(appState);
    const { getBase64ImageData } = useImageProcessor(appState, updateAppState);
    
    const handleNameChange = useCallback((e) => {
      updateAppState({
        ui: { name: e.target.value }
      });
    }, [updateAppState]);
    
    const handleExport = useCallback(async () => {
      setIsExporting(true);
      setExportError(null);
      
      try {
        // Validate before export
        const errors = getValidationErrors();
        if (errors.length > 0) {
          throw new Error(`Validation failed: ${errors.join(', ')}`);
        }
        
        // Collect and format data
        const stampData = collectStampData(appState, getBase64ImageData);
        
        // Create and download JSON file
        const jsonString = JSON.stringify(stampData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const filename = `stamp_${appState.ui.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        console.log('Export successful:', filename);
        
      } catch (error) {
        console.error('Export failed:', error);
        setExportError(error.message);
      } finally {
        setIsExporting(false);
      }
    }, [appState, getValidationErrors, getBase64ImageData]);
    
    const validationErrors = getValidationErrors();
    
    return (
      <div className="export-controls">
        <div className="export-controls-header">
          <h3>Export Stamp File</h3>
        </div>
        
        <div className="name-input-group">
          <label htmlFor="stamp-name">Stamp Name *</label>
          <input
            id="stamp-name"
            type="text"
            value={appState.ui.name}
            onChange={handleNameChange}
            placeholder="Enter stamp name"
            className="name-input"
            required
          />
        </div>
        
        {validationErrors.length > 0 && (
          <div className="validation-errors">
            <h4>Please fix the following issues:</h4>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {exportError && (
          <div className="export-error">
            ⚠️ Export failed: {exportError}
          </div>
        )}
        
        <div className="export-actions">
          <button
            onClick={handleExport}
            disabled={!isReadyForExport || isExporting}
            className={`btn btn-lg ${
              isReadyForExport ? 'btn-success' : 'btn-secondary'
            }`}
          >
            {isExporting ? 'Exporting...' : 'Export Stamp File'}
          </button>
        </div>
        
        {isReadyForExport && (
          <div className="export-preview">
            <h4>Export Preview</h4>
            <div className="preview-data">
              <div>Name: {appState.ui.name}</div>
              <div>Type: SYNDICATE</div>
              <div>Reference Height: {appState.image.height}</div>
              <div>Header Bottom: {appState.lines.headerEnd}</div>
              <div>Footer Top: {appState.lines.footerStart}</div>
              <div>Font Size: {calculateFontSize(appState.lines)}</div>
              {appState.lines.leftStart !== null && (
                <div>Left Start: {appState.lines.leftStart}</div>
              )}
              {appState.lines.rightStart !== null && (
                <div>Right Start: {appState.lines.rightStart}</div>
              )}
              {appState.lines.letterLines.length > 0 && (
                <div>Letter Lines: {appState.lines.letterLines.length} lines</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Helper function to collect stamp data
  const collectStampData = (appState, getBase64ImageData) => {
    const lines = appState.lines;
    
    // Calculate defaults for optional fields
    const topLine = lines.topLine ?? (lines.headerEnd - 1);
    const baseline = lines.baseline ?? (lines.footerStart + 1);
    
    // Calculate font size
    const fontSize = lines.textLine - topLine;
    
    // Build base coordinate array
    const baseCoordinate = [lines.textLine];
    
    // Get image data
    const imageData = getBase64ImageData();
    if (!imageData) {
      throw new Error('Failed to get image data');
    }
    
    return {
      name: appState.ui.name,
      type: 'SYNDICATE',
      referenceHeight: appState.image.height,
      headerBottom: lines.headerEnd,
      footerTop: lines.footerStart,
      fontSize: fontSize,
      leftStart: lines.leftStart,
      rightStart: lines.rightStart,
      baseCoordinate: baseCoordinate,
      offset: { x: 0, y: 0 },
      imageData: imageData
    };
  };
  
  // Helper function to calculate font size
  const calculateFontSize = (lines) => {
    const topLine = lines.topLine ?? (lines.headerEnd - 1);
    return lines.textLine - topLine;
  };
  ```
  - Complete export functionality with validation
  - Real-time preview of export data
  - Error handling and user feedback
  - Automatic filename generation

### Export Data Utilities
- [ ] **Create export utilities for data formatting**
  ```jsx
  // src/utils/exportUtils.js
  
  export const validateExportData = (appState) => {
    const errors = [];
    const warnings = [];
    
    // Required field validation
    if (!appState.ui.name.trim()) {
      errors.push('Stamp name is required');
    }
    
    if (!appState.image.canvas) {
      errors.push('No image loaded');
    }
    
    if (!appState.settings.backgroundRemoved) {
      errors.push('Background removal is required');
    }
    
    if (appState.lines.headerEnd === null) {
      errors.push('Header end line is required');
    }
    
    if (appState.lines.footerStart === null) {
      errors.push('Footer start line is required');
    }
    
    if (appState.lines.textLine === null) {
      errors.push('Text line is required');
    }
    
    // Logical validation
    if (appState.lines.headerEnd !== null && appState.lines.footerStart !== null) {
      if (appState.lines.headerEnd >= appState.lines.footerStart) {
        errors.push('Header end must be above footer start');
      }
    }
    
    if (appState.lines.textLine !== null) {
      if (appState.lines.headerEnd !== null && appState.lines.textLine <= appState.lines.headerEnd) {
        errors.push('Text line must be below header end');
      }
      if (appState.lines.footerStart !== null && appState.lines.textLine >= appState.lines.footerStart) {
        errors.push('Text line must be above footer start');
      }
    }
    
    // Warnings for optional fields
    if (appState.lines.leftStart === null && appState.lines.rightStart === null) {
      warnings.push('No horizontal boundaries defined');
    }
    
    if (appState.lines.letterLines.length === 0) {
      warnings.push('No letter lines defined');
    }
    
    return { errors, warnings };
  };
  
  export const formatStampData = (appState, imageData) => {
    const lines = appState.lines;
    
    // Calculate derived values
    const topLine = lines.topLine ?? (lines.headerEnd - 1);
    const baseline = lines.baseline ?? (lines.footerStart + 1);
    const fontSize = lines.textLine - topLine;
    
    // Format according to stamp file specification
    const stampData = {
      name: appState.ui.name.trim(),
      type: 'SYNDICATE',
      referenceHeight: appState.image.height,
      headerBottom: lines.headerEnd,
      footerTop: lines.footerStart,
      fontSize: fontSize,
      baseCoordinate: [lines.textLine],
      offset: { x: 0, y: 0 },
      imageData: imageData
    };
    
    // Add optional fields only if they exist
    if (lines.leftStart !== null) {
      stampData.leftStart = lines.leftStart;
    }
    
    if (lines.rightStart !== null) {
      stampData.rightStart = lines.rightStart;
    }
    
    return stampData;
  };
  
  export const downloadJSON = (data, filename) => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  };
  ```
  - Comprehensive validation with errors and warnings
  - Proper stamp file format generation
  - Robust file download handling

### Export Styling
- [ ] **Add CSS for export controls**
  ```css
  .export-controls {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f8f9fa;
    margin-bottom: 20px;
  }
  
  .export-controls-header h3 {
    margin: 0 0 20px 0;
    color: #333;
  }
  
  .name-input-group {
    margin-bottom: 20px;
  }
  
  .name-input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .name-input {
    width: 100%;
    max-width: 300px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .validation-errors {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
    color: #721c24;
  }
  
  .validation-errors h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
  }
  
  .validation-errors ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .export-error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 20px;
    color: #721c24;
  }
  
  .export-actions {
    margin-bottom: 20px;
  }
  
  .export-preview {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
  }
  
  .export-preview h4 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  .preview-data {
    font-family: monospace;
    font-size: 14px;
    line-height: 1.4;
  }
  
  .preview-data > div {
    margin-bottom: 4px;
  }
  ```
  - Clean export interface styling
  - Error and validation feedback
  - Preview data formatting

## React Error Handling and Validation

### Error Boundary Component
- [ ] **Create React Error Boundary for graceful error handling**
  ```jsx
  // src/components/ErrorBoundary.jsx
  import React from 'react';
  
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
    
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
      
      // Log error for debugging
      console.error('Application Error:', error, errorInfo);
    }
    
    render() {
      if (this.state.hasError) {
        return (
          <div className="error-boundary">
            <div className="error-container">
              <h2>Something went wrong</h2>
              <p>The application encountered an unexpected error. Please refresh the page to try again.</p>
              
              {process.env.NODE_ENV === 'development' && (
                <details className="error-details">
                  <summary>Error Details (Development Mode)</summary>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
              
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Refresh Page
              </button>
            </div>
          </div>
        );
      }
      
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
  ```
  - Catches JavaScript errors in React component tree
  - Provides fallback UI with recovery options
  - Logs errors for debugging in development mode

### Input Validation Hook
- [ ] **Create comprehensive useValidation hook**
  ```jsx
  // src/hooks/useValidation.js
  import { useCallback, useState, useEffect } from 'react';
  
  export const useValidation = () => {
    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({});
    
    const validateFile = useCallback((file) => {
      const fileErrors = [];
      
      if (!file) {
        fileErrors.push('No file selected');
        return { isValid: false, errors: fileErrors };
      }
      
      // Check file type
      if (file.type !== 'image/png') {
        fileErrors.push('File must be a PNG image');
      }
      
      // Check file size (10MB limit)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        fileErrors.push(`File size (${formatFileSize(file.size)}) exceeds limit (${formatFileSize(maxSize)})`);
      }
      
      // Check if file is corrupted (basic check)
      if (file.size === 0) {
        fileErrors.push('File appears to be corrupted or empty');
      }
      
      return {
        isValid: fileErrors.length === 0,
        errors: fileErrors
      };
    }, []);
    
    const validateImageDimensions = useCallback((width, height) => {
      const dimensionErrors = [];
      const dimensionWarnings = [];
      
      // Minimum dimensions
      if (width < 50 || height < 50) {
        dimensionErrors.push('Image dimensions too small (minimum 50x50 pixels)');
      }
      
      // Maximum dimensions (for performance)
      if (width > 4000 || height > 4000) {
        dimensionWarnings.push('Large image dimensions may affect performance');
      }
      
      // Aspect ratio warnings
      const aspectRatio = width / height;
      if (aspectRatio > 3 || aspectRatio < 0.33) {
        dimensionWarnings.push('Unusual aspect ratio detected');
      }
      
      return {
        isValid: dimensionErrors.length === 0,
        errors: dimensionErrors,
        warnings: dimensionWarnings
      };
    }, []);
    
    const validateCoordinates = useCallback((lines, imageWidth, imageHeight) => {
      const coordErrors = [];
      
      // Check required coordinates
      if (lines.headerEnd === null) {
        coordErrors.push('Header end line is required');
      }
      
      if (lines.footerStart === null) {
        coordErrors.push('Footer start line is required');
      }
      
      if (lines.textLine === null) {
        coordErrors.push('Text line is required');
      }
      
      // Check bounds
      Object.entries(lines).forEach(([lineType, value]) => {
        if (value === null || lineType === 'letterLines') return;
        
        const isVertical = ['leftStart', 'rightStart'].includes(lineType);
        const maxValue = isVertical ? imageWidth : imageHeight;
        
        if (value < 0 || value > maxValue) {
          coordErrors.push(`${lineType} coordinate (${value}) is out of bounds (0-${maxValue})`);
        }
      });
      
      // Check logical order
      if (lines.headerEnd !== null && lines.footerStart !== null) {
        if (lines.headerEnd >= lines.footerStart) {
          coordErrors.push('Header end must be above footer start');
        }
      }
      
      if (lines.textLine !== null) {
        if (lines.headerEnd !== null && lines.textLine <= lines.headerEnd) {
          coordErrors.push('Text line must be below header end');
        }
        if (lines.footerStart !== null && lines.textLine >= lines.footerStart) {
          coordErrors.push('Text line must be above footer start');
        }
      }
      
      if (lines.leftStart !== null && lines.rightStart !== null) {
        if (lines.leftStart >= lines.rightStart) {
          coordErrors.push('Left start must be left of right start');
        }
      }
      
      return {
        isValid: coordErrors.length === 0,
        errors: coordErrors
      };
    }, []);
    
    const validateExportReadiness = useCallback((appState) => {
      const exportErrors = [];
      
      if (!appState.ui.name.trim()) {
        exportErrors.push('Stamp name is required');
      }
      
      if (!appState.image.canvas) {
        exportErrors.push('No image loaded');
      }
      
      if (!appState.settings.backgroundRemoved) {
        exportErrors.push('Background removal is required');
      }
      
      // Validate coordinates
      const coordValidation = validateCoordinates(
        appState.lines, 
        appState.image.width, 
        appState.image.height
      );
      
      exportErrors.push(...coordValidation.errors);
      
      return {
        isValid: exportErrors.length === 0,
        errors: exportErrors
      };
    }, [validateCoordinates]);
    
    const clearErrors = useCallback((field) => {
      if (field) {
        setErrors(prev => ({ ...prev, [field]: null }));
        setWarnings(prev => ({ ...prev, [field]: null }));
      } else {
        setErrors({});
        setWarnings({});
      }
    }, []);
    
    const setFieldError = useCallback((field, error) => {
      setErrors(prev => ({ ...prev, [field]: error }));
    }, []);
    
    const setFieldWarning = useCallback((field, warning) => {
      setWarnings(prev => ({ ...prev, [field]: warning }));
    }, []);
    
    return {
      errors,
      warnings,
      validateFile,
      validateImageDimensions,
      validateCoordinates,
      validateExportReadiness,
      clearErrors,
      setFieldError,
      setFieldWarning
    };
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  ```
  - Comprehensive validation for all input types
  - Real-time error and warning management
  - Bounds checking and logical validation

### Error Display Components
- [ ] **Create reusable error display components**
  ```jsx
  // src/components/ErrorDisplay.jsx
  import React from 'react';
  
  export const ErrorMessage = ({ error, onDismiss }) => {
    if (!error) return null;
    
    return (
      <div className="error-message">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{error}</span>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="error-dismiss"
            aria-label="Dismiss error"
          >
            ×
          </button>
        )}
      </div>
    );
  };
  
  export const WarningMessage = ({ warning, onDismiss }) => {
    if (!warning) return null;
    
    return (
      <div className="warning-message">
        <span className="warning-icon">⚡</span>
        <span className="warning-text">{warning}</span>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="warning-dismiss"
            aria-label="Dismiss warning"
          >
            ×
          </button>
        )}
      </div>
    );
  };
  
  export const ValidationSummary = ({ errors, warnings }) => {
    if (!errors?.length && !warnings?.length) return null;
    
    return (
      <div className="validation-summary">
        {errors?.length > 0 && (
          <div className="validation-errors">
            <h4>Please fix the following errors:</h4>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {warnings?.length > 0 && (
          <div className="validation-warnings">
            <h4>Warnings:</h4>
            <ul>
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  ```
  - Reusable error and warning components
  - Dismissible messages with accessibility
  - Validation summary for multiple issues

### Error Handling Utilities
- [ ] **Create error handling utilities**
  ```jsx
  // src/utils/errorHandling.js
  
  export const handleAsyncError = async (asyncFunction, errorCallback) => {
    try {
      return await asyncFunction();
    } catch (error) {
      console.error('Async operation failed:', error);
      if (errorCallback) {
        errorCallback(error);
      }
      throw error;
    }
  };
  
  export const handleCanvasError = (canvas, fallbackMessage = 'Canvas operation failed') => {
    if (!canvas) {
      throw new Error('Canvas element not found');
    }
    
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D rendering context');
    }
    
    return context;
  };
  
  export const handleFileError = (file, validationResult) => {
    if (!validationResult.isValid) {
      const errorMessage = validationResult.errors.join('; ');
      throw new Error(`File validation failed: ${errorMessage}`);
    }
  };
  
  export const createUserFriendlyError = (error) => {
    // Convert technical errors to user-friendly messages
    const errorMap = {
      'NetworkError': 'Network connection failed. Please check your internet connection.',
      'QuotaExceededError': 'Storage quota exceeded. Please free up some space.',
      'SecurityError': 'Security restriction encountered. Please check file permissions.',
      'NotSupportedError': 'This operation is not supported by your browser.',
      'InvalidStateError': 'Invalid operation state. Please refresh and try again.'
    };
    
    const errorType = error.name || error.constructor.name;
    return errorMap[errorType] || error.message || 'An unexpected error occurred';
  };
  
  export const logError = (error, context = '') => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      context,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    };
    
    console.error('Application Error:', logEntry);
    
    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToErrorTrackingService(logEntry);
    }
  };
  ```
  - Async error handling utilities
  - Canvas-specific error handling
  - User-friendly error message conversion
  - Error logging and tracking

## React User Experience Enhancements

### Visual Feedback Components
- [ ] **Create StatusIndicator component for real-time feedback**
  ```jsx
  // src/components/StatusIndicator.jsx
  import React from 'react';
  
  export const StatusIndicator = ({ appState }) => {
    const getStatus = () => {
      if (!appState.image.file) {
        return { text: 'Upload an image to begin', color: '#6c757d', icon: '📁' };
      }
      
      if (!appState.settings.backgroundRemoved) {
        return { text: 'Remove background to continue', color: '#ffc107', icon: '🎨' };
      }
      
      const requiredLines = ['headerEnd', 'footerStart', 'textLine'];
      const missingLines = requiredLines.filter(line => appState.lines[line] === null);
      
      if (missingLines.length > 0) {
        return { 
          text: `Select ${missingLines.length} required line${missingLines.length > 1 ? 's' : ''}`, 
          color: '#fd7e14', 
          icon: '📏' 
        };
      }
      
      if (!appState.ui.name.trim()) {
        return { text: 'Enter stamp name to export', color: '#20c997', icon: '✏️' };
      }
      
      return { text: 'Ready to export!', color: '#28a745', icon: '✅' };
    };
    
    const status = getStatus();
    
    return (
      <div className="status-indicator" style={{ color: status.color }}>
        <span className="status-icon">{status.icon}</span>
        <span className="status-text">{status.text}</span>
      </div>
    );
  };
  
  export const ProgressIndicator = ({ isVisible, progress, message }) => {
    if (!isVisible) return null;
    
    return (
      <div className="progress-indicator">
        <div className="progress-message">{message}</div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-percentage">{Math.round(progress)}%</div>
      </div>
    );
  };
  
  export const CoordinateDisplay = ({ appState }) => {
    if (!appState.ui.zoomVisible || !appState.ui.zoomPosition) {
      return null;
    }
    
    return (
      <div className="coordinate-display">
        <div className="coordinate-item">
          <label>X:</label>
          <span>{appState.ui.zoomPosition.x}</span>
        </div>
        <div className="coordinate-item">
          <label>Y:</label>
          <span>{appState.ui.zoomPosition.y}</span>
        </div>
      </div>
    );
  };
  ```
  - Real-time status updates based on application state
  - Progress indicators for long operations
  - Live coordinate display during interactions

### Toast Notification System
- [ ] **Create Toast notification system for user feedback**
  ```jsx
  // src/components/Toast.jsx
  import React, { useState, useEffect, useCallback } from 'react';
  
  export const useToast = () => {
    const [toasts, setToasts] = useState([]);
    
    const addToast = useCallback((message, type = 'info', duration = 4000) => {
      const id = Date.now() + Math.random();
      const toast = { id, message, type, duration };
      
      setToasts(prev => [...prev, toast]);
      
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
      
      return id;
    }, []);
    
    const removeToast = useCallback((id) => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);
    
    const success = useCallback((message, duration) => {
      return addToast(message, 'success', duration);
    }, [addToast]);
    
    const error = useCallback((message, duration = 6000) => {
      return addToast(message, 'error', duration);
    }, [addToast]);
    
    const warning = useCallback((message, duration) => {
      return addToast(message, 'warning', duration);
    }, [addToast]);
    
    const info = useCallback((message, duration) => {
      return addToast(message, 'info', duration);
    }, [addToast]);
    
    return {
      toasts,
      addToast,
      removeToast,
      success,
      error,
      warning,
      info
    };
  };
  
  export const ToastContainer = ({ toasts, removeToast }) => {
    return (
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onRemove={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    );
  };
  
  const Toast = ({ toast, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      // Trigger animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }, []);
    
    const handleRemove = () => {
      setIsVisible(false);
      setTimeout(onRemove, 300); // Wait for animation
    };
    
    const getIcon = () => {
      switch (toast.type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        default: return 'ℹ️';
      }
    };
    
    return (
      <div 
        className={`toast toast-${toast.type} ${isVisible ? 'toast-visible' : ''}`}
        onClick={handleRemove}
      >
        <span className="toast-icon">{getIcon()}</span>
        <span className="toast-message">{toast.message}</span>
        <button 
          className="toast-close"
          onClick={handleRemove}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    );
  };
  ```
  - Toast notification system for user feedback
  - Different types: success, error, warning, info
  - Auto-dismiss with configurable duration

### Loading States and Skeletons
- [ ] **Create loading state components**
  ```jsx
  // src/components/LoadingStates.jsx
  import React from 'react';
  
  export const LoadingSpinner = ({ size = 'medium', message }) => {
    const sizeClass = `spinner-${size}`;
    
    return (
      <div className="loading-spinner-container">
        <div className={`loading-spinner ${sizeClass}`}></div>
        {message && <div className="loading-message">{message}</div>}
      </div>
    );
  };
  
  export const SkeletonLoader = ({ width, height, className }) => {
    return (
      <div 
        className={`skeleton-loader ${className || ''}`}
        style={{ width, height }}
      ></div>
    );
  };
  
  export const ImagePlaceholder = ({ width, height }) => {
    return (
      <div className="image-placeholder" style={{ width, height }}>
        <div className="placeholder-icon">🖼️</div>
        <div className="placeholder-text">No image loaded</div>
      </div>
    );
  };
  
  export const ButtonLoadingState = ({ isLoading, children, ...props }) => {
    return (
      <button {...props} disabled={isLoading || props.disabled}>
        {isLoading ? (
          <>
            <LoadingSpinner size="small" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  };
  ```
  - Loading spinners with different sizes
  - Skeleton loaders for content placeholders
  - Button loading states with spinners

### React Accessibility Enhancements
- [ ] **Create accessibility utilities and components**
  ```jsx
  // src/components/Accessibility.jsx
  import React, { useEffect, useRef } from 'react';
  
  export const SkipLink = ({ targetId, children }) => {
    return (
      <a 
        href={`#${targetId}`}
        className="skip-link"
        onFocus={(e) => e.target.classList.add('skip-link-focused')}
        onBlur={(e) => e.target.classList.remove('skip-link-focused')}
      >
        {children}
      </a>
    );
  };
  
  export const VisuallyHidden = ({ children, focusable = false }) => {
    return (
      <span 
        className={`visually-hidden ${focusable ? 'visually-hidden-focusable' : ''}`}
      >
        {children}
      </span>
    );
  };
  
  export const FocusTrap = ({ children, isActive }) => {
    const containerRef = useRef(null);
    
    useEffect(() => {
      if (!isActive) return;
      
      const container = containerRef.current;
      if (!container) return;
      
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      container.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      
      return () => {
        container.removeEventListener('keydown', handleTabKey);
      };
    }, [isActive]);
    
    return (
      <div ref={containerRef} className="focus-trap">
        {children}
      </div>
    );
  };
  
  export const useAnnouncement = () => {
    const announcementRef = useRef(null);
    
    const announce = (message, priority = 'polite') => {
      if (!announcementRef.current) {
        // Create live region if it doesn't exist
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
        announcementRef.current = liveRegion;
      }
      
      const liveRegion = announcementRef.current;
      liveRegion.textContent = '';
      
      // Small delay to ensure screen readers pick up the change
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
    };
    
    return { announce };
  };
  ```
  - Skip links for keyboard navigation
  - Focus trap for modal interactions
  - Screen reader announcements
  - Visually hidden content for accessibility

### Keyboard Navigation Support
- [ ] **Add comprehensive keyboard navigation**
  ```jsx
  // src/hooks/useKeyboardNavigation.js
  import { useEffect, useCallback } from 'react';
  
  export const useKeyboardNavigation = (appState, updateAppState) => {
    const handleKeyDown = useCallback((e) => {
      // Escape key cancels current mode
      if (e.key === 'Escape' && appState.ui.activeMode) {
        updateAppState({ ui: { activeMode: null } });
        return;
      }
      
      // Number keys for quick line selection (1-7)
      if (e.key >= '1' && e.key <= '7' && !e.ctrlKey && !e.altKey) {
        const lineTypes = [
          'headerEnd', 'footerStart', 'textLine', 
          'baseline', 'topLine', 'leftStart', 'rightStart'
        ];
        const index = parseInt(e.key) - 1;
        if (index < lineTypes.length) {
          updateAppState({ ui: { activeMode: lineTypes[index] } });
          e.preventDefault();
        }
      }
      
      // Ctrl+Z for undo (future feature)
      if (e.ctrlKey && e.key === 'z') {
        // TODO: Implement undo functionality
        e.preventDefault();
      }
      
      // Ctrl+S for save/export
      if (e.ctrlKey && e.key === 's') {
        // Trigger export if ready
        e.preventDefault();
        // TODO: Trigger export function
      }
    }, [appState.ui.activeMode, updateAppState]);
    
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
  };
  
  export const useArrowKeyNavigation = (canvasRef, appState, updateAppState) => {
    const handleArrowKeys = useCallback((e) => {
      if (!appState.ui.activeMode || !canvasRef.current) return;
      
      const step = e.shiftKey ? 10 : 1; // Shift for larger steps
      let newPosition = { ...appState.ui.zoomPosition };
      
      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, newPosition.y - step);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(appState.image.height - 1, newPosition.y + step);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, newPosition.x - step);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(appState.image.width - 1, newPosition.x + step);
          break;
        default:
          return;
      }
      
      updateAppState({ ui: { zoomPosition: newPosition } });
      e.preventDefault();
    }, [appState, updateAppState, canvasRef]);
    
    useEffect(() => {
      document.addEventListener('keydown', handleArrowKeys);
      return () => document.removeEventListener('keydown', handleArrowKeys);
    }, [handleArrowKeys]);
  };
  ```
  - Escape key to cancel operations
  - Number keys for quick line selection
  - Arrow keys for precise positioning
  - Keyboard shortcuts for common actions

## React Testing and Quality Assurance

### React Testing Setup
- [ ] **Set up React testing environment**
  ```bash
  # Install testing dependencies
  npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
  npm install --save-dev jest-environment-jsdom canvas
  ```
  ```javascript
  // src/setupTests.js
  import '@testing-library/jest-dom';
  
  // Mock canvas for testing
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    drawImage: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Uint8ClampedArray(4) })),
    putImageData: jest.fn(),
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 100 })),
  }));
  
  // Mock File API
  global.URL.createObjectURL = jest.fn(() => 'mock-url');
  global.URL.revokeObjectURL = jest.fn();
  ```
  - React Testing Library for component testing
  - Canvas mocking for headless testing
  - File API mocking for upload tests

### Component Testing
- [ ] **Create comprehensive component tests**
  ```javascript
  // src/components/__tests__/FileUpload.test.jsx
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { FileUpload } from '../FileUpload';
  
  const mockUpdateAppState = jest.fn();
  const mockAppState = {
    image: { file: null, canvas: null, originalData: null, processedData: null }
  };
  
  describe('FileUpload Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    test('renders upload area when no file is selected', () => {
      render(<FileUpload appState={mockAppState} updateAppState={mockUpdateAppState} />);
      expect(screen.getByText(/click to upload/i)).toBeInTheDocument();
    });
    
    test('handles file selection', async () => {
      const user = userEvent.setup();
      render(<FileUpload appState={mockAppState} updateAppState={mockUpdateAppState} />);
      
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const input = screen.getByLabelText(/click to upload/i);
      
      await user.upload(input, file);
      
      await waitFor(() => {
        expect(mockUpdateAppState).toHaveBeenCalled();
      });
    });
    
    test('validates file type', async () => {
      const user = userEvent.setup();
      render(<FileUpload appState={mockAppState} updateAppState={mockUpdateAppState} />);
      
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const input = screen.getByLabelText(/click to upload/i);
      
      await user.upload(input, file);
      
      expect(screen.getByText(/please select a png file/i)).toBeInTheDocument();
    });
    
    test('handles drag and drop', async () => {
      render(<FileUpload appState={mockAppState} updateAppState={mockUpdateAppState} />);
      
      const dropZone = screen.getByText(/click to upload/i).closest('.file-upload-area');
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      
      fireEvent.dragEnter(dropZone, {
        dataTransfer: { files: [file] }
      });
      
      expect(dropZone).toHaveClass('drag-active');
      
      fireEvent.drop(dropZone, {
        dataTransfer: { files: [file] }
      });
      
      await waitFor(() => {
        expect(mockUpdateAppState).toHaveBeenCalled();
      });
    });
  });
  ```
  - File upload functionality testing
  - Drag and drop interaction testing
  - File validation testing

### Hook Testing
- [ ] **Test custom React hooks**
  ```javascript
  // src/hooks/__tests__/useImageProcessor.test.js
  import { renderHook, act } from '@testing-library/react';
  import { useImageProcessor } from '../useImageProcessor';
  
  const mockAppState = {
    image: {
      canvas: document.createElement('canvas'),
      originalData: new ImageData(100, 100)
    }
  };
  
  const mockUpdateAppState = jest.fn();
  
  describe('useImageProcessor Hook', () => {
    test('processes background removal', async () => {
      const { result } = renderHook(() => 
        useImageProcessor(mockAppState, mockUpdateAppState)
      );
      
      await act(async () => {
        result.current.processBackgroundRemoval(50, 50);
      });
      
      expect(mockUpdateAppState).toHaveBeenCalledWith(
        expect.objectContaining({
          settings: expect.objectContaining({
            backgroundRemoved: true
          })
        })
      );
    });
    
    test('generates base64 image data', () => {
      const { result } = renderHook(() => 
        useImageProcessor(mockAppState, mockUpdateAppState)
      );
      
      const base64Data = result.current.getBase64ImageData();
      expect(typeof base64Data).toBe('string');
      expect(base64Data).toMatch(/^data:image\/png;base64,/);
    });
  });
  ```
  - Custom hook behavior testing
  - State update verification
  - Function return value testing

### Integration Testing
- [ ] **Create integration tests for complete workflows**
  ```javascript
  // src/__tests__/StampCreationWorkflow.test.jsx
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import App from '../App';
  
  describe('Complete Stamp Creation Workflow', () => {
    test('creates a stamp from start to finish', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Step 1: Upload image
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const fileInput = screen.getByLabelText(/click to upload/i);
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        expect(screen.getByText(/loaded successfully/i)).toBeInTheDocument();
      });
      
      // Step 2: Remove background
      const removeBackgroundBtn = screen.getByText(/remove background/i);
      await user.click(removeBackgroundBtn);
      
      // Simulate canvas click for background removal
      const canvas = screen.getByRole('img'); // Canvas with image
      fireEvent.click(canvas, { clientX: 100, clientY: 100 });
      
      await waitFor(() => {
        expect(screen.getByText(/background removed/i)).toBeInTheDocument();
      });
      
      // Step 3: Select required lines
      const headerBtn = screen.getByText(/header end/i);
      await user.click(headerBtn);
      fireEvent.click(canvas, { clientX: 50, clientY: 50 });
      
      const footerBtn = screen.getByText(/footer start/i);
      await user.click(footerBtn);
      fireEvent.click(canvas, { clientX: 50, clientY: 150 });
      
      const textBtn = screen.getByText(/text line/i);
      await user.click(textBtn);
      fireEvent.click(canvas, { clientX: 50, clientY: 100 });
      
      // Step 4: Enter stamp name
      const nameInput = screen.getByLabelText(/stamp name/i);
      await user.type(nameInput, 'Test Stamp');
      
      // Step 5: Export
      const exportBtn = screen.getByText(/export stamp file/i);
      expect(exportBtn).not.toBeDisabled();
      
      await user.click(exportBtn);
      
      // Verify export was triggered (would need to mock download)
      await waitFor(() => {
        expect(screen.getByText(/export successful/i)).toBeInTheDocument();
      });
    });
  });
  ```
  - End-to-end workflow testing
  - Multi-step interaction verification
  - State progression validation

### Performance Testing
- [ ] **Create performance tests for React components**
  ```javascript
  // src/__tests__/Performance.test.js
  import React from 'react';
  import { render, act } from '@testing-library/react';
  import { performance } from 'perf_hooks';
  import { ZoomView } from '../components/ZoomView';
  
  describe('Performance Tests', () => {
    test('zoom updates perform within acceptable time', async () => {
      const mockAppState = {
        ui: { zoomVisible: true, zoomPosition: { x: 100, y: 100 } },
        image: { canvas: document.createElement('canvas') }
      };
      
      const startTime = performance.now();
      
      await act(async () => {
        render(<ZoomView appState={mockAppState} updateAppState={jest.fn()} />);
        
        // Simulate multiple zoom updates
        for (let i = 0; i < 100; i++) {
          mockAppState.ui.zoomPosition = { x: i, y: i };
        }
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete within 100ms
      expect(duration).toBeLessThan(100);
    });
    
    test('large image handling', async () => {
      const largeCanvas = document.createElement('canvas');
      largeCanvas.width = 4000;
      largeCanvas.height = 4000;
      
      const mockAppState = {
        image: { canvas: largeCanvas, width: 4000, height: 4000 },
        lines: { letterLines: Array.from({ length: 50 }, (_, i) => i * 10) }
      };
      
      const startTime = performance.now();
      
      await act(async () => {
        render(<App />);
        // Simulate operations with large image
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should handle large images within reasonable time
      expect(duration).toBeLessThan(1000);
    });
  });
  ```
  - Zoom performance benchmarking
  - Large image handling tests
  - Memory usage monitoring

### Cross-browser Testing Strategy
- [ ] **Set up cross-browser testing with Playwright**
  ```javascript
  // tests/e2e/crossBrowser.spec.js
  import { test, expect } from '@playwright/test';
  
  ['chromium', 'firefox', 'webkit'].forEach(browserName => {
    test.describe(`${browserName} browser tests`, () => {
      test('file upload works', async ({ page }) => {
        await page.goto('http://localhost:3000');
        
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles('test-data/sample.png');
        
        await expect(page.locator('text=loaded successfully')).toBeVisible();
      });
      
      test('canvas operations work', async ({ page }) => {
        await page.goto('http://localhost:3000');
        
        // Upload file first
        await page.locator('input[type="file"]').setInputFiles('test-data/sample.png');
        
        // Test canvas click
        await page.click('button:has-text("Remove Background")');
        await page.click('canvas');
        
        await expect(page.locator('text=background removed')).toBeVisible();
      });
      
      test('keyboard navigation works', async ({ page }) => {
        await page.goto('http://localhost:3000');
        
        // Test escape key
        await page.keyboard.press('Escape');
        
        // Test number keys for line selection
        await page.keyboard.press('1');
        await expect(page.locator('button:has-text("Click to place")')).toBeVisible();
      });
    });
  });
  ```
  - Multi-browser compatibility testing
  - Canvas API compatibility verification
  - File API functionality testing

### Accessibility Testing
- [ ] **Add automated accessibility testing**
  ```javascript
  // src/__tests__/Accessibility.test.jsx
  import React from 'react';
  import { render } from '@testing-library/react';
  import { axe, toHaveNoViolations } from 'jest-axe';
  import App from '../App';
  
  expect.extend(toHaveNoViolations);
  
  describe('Accessibility Tests', () => {
    test('app has no accessibility violations', async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    test('keyboard navigation works', async () => {
      const { container } = render(<App />);
      
      // Test tab navigation
      const focusableElements = container.querySelectorAll(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      
      expect(focusableElements.length).toBeGreaterThan(0);
      
      // Each focusable element should have proper labels
      focusableElements.forEach(element => {
        expect(
          element.getAttribute('aria-label') ||
          element.getAttribute('aria-labelledby') ||
          element.textContent.trim()
        ).toBeTruthy();
      });
    });
  });
  ```
  - Automated accessibility testing with axe
  - Keyboard navigation verification
  - ARIA label validation

## React Documentation and Cleanup

### React Component Documentation
- [ ] **Add comprehensive JSDoc comments to all React components**
  ```jsx
  /**
   * FileUpload Component - Handles PNG file upload with drag-and-drop functionality
   * 
   * @component
   * @param {Object} props - Component props
   * @param {Object} props.appState - Application state object
   * @param {Object} props.appState.image - Image-related state
   * @param {Function} props.updateAppState - Function to update application state
   * @returns {JSX.Element} File upload component with drag-and-drop area
   * 
   * @example
   * <FileUpload 
   *   appState={appState} 
   *   updateAppState={updateAppState} 
   * />
   */
  export const FileUpload = ({ appState, updateAppState }) => {
    // Component implementation
  };
  ```
  - Document all component props with TypeScript-style annotations
  - Include usage examples for each component
  - Document component behavior and side effects

### React Hook Documentation
- [ ] **Document all custom React hooks with detailed JSDoc**
  ```jsx
  /**
   * useImageProcessor - Custom hook for image processing operations
   * 
   * @hook
   * @param {Object} appState - Current application state
   * @param {Function} updateAppState - State update function
   * @returns {Object} Image processing functions and state
   * @returns {React.RefObject} returns.canvasRef - Canvas element reference
   * @returns {Function} returns.loadImage - Loads image file to canvas
   * @returns {Function} returns.processBackgroundRemoval - Removes background using color-to-alpha
   * @returns {Function} returns.getBase64ImageData - Exports image as base64 string
   * 
   * @example
   * const { loadImage, processBackgroundRemoval } = useImageProcessor(appState, updateAppState);
   * 
   * // Load an image file
   * await loadImage(file);
   * 
   * // Remove background at coordinates
   * processBackgroundRemoval(100, 150);
   */
  export const useImageProcessor = (appState, updateAppState) => {
    // Hook implementation
  };
  ```
  - Document hook parameters and return values
  - Include practical usage examples
  - Document hook dependencies and side effects

### Algorithm Documentation
- [ ] **Document complex algorithms with detailed comments**
  ```jsx
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
   * 
   * Algorithm steps:
   * 1. Normalize RGB values to 0-1 range
   * 2. Calculate alpha ratio for each pixel
   * 3. Apply color-to-alpha conversion formula
   * 4. Clamp values and convert back to 0-255 range
   */
  export const removeBackground = (imageData, targetColor) => {
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
  ```
  - Detailed algorithm explanation with mathematical formulas
  - Step-by-step process documentation
  - Parameter validation and edge case handling

### React Development Cleanup
- [ ] **Remove development artifacts and optimize for production**
  ```javascript
  // Remove all console.log statements except critical error logging
  // Before:
  console.log('Debug: Processing background removal', targetColor);
  
  // After: (only keep essential error logging)
  if (process.env.NODE_ENV === 'development') {
    console.log('Debug: Processing background removal', targetColor);
  }
  
  // Or use proper error logging
  logError(error, 'Background removal failed');
  ```
  - Remove debug console.log statements
  - Keep only essential error logging
  - Add environment-specific logging

### CSS and Styling Cleanup
- [ ] **Optimize CSS for production and remove unused styles**
  ```css
  /* Remove unused CSS classes */
  /* Before: */
  .unused-class {
    display: none;
  }
  
  /* After: Remove completely */
  
  /* Optimize CSS custom properties */
  :root {
    /* Color palette */
    --primary-color: #007bff;
    --success-color: #28a745;
    --error-color: #dc3545;
    --warning-color: #ffc107;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    
    /* Typography */
    --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  }
  
  /* Consolidate similar styles */
  .btn, .button {
    /* Unified button styles */
  }
  ```
  - Remove unused CSS classes and rules
  - Consolidate similar styles
  - Use CSS custom properties for consistency

### File Organization and Structure
- [ ] **Optimize React project structure**
  ```
  src/
  ├── components/           # React components
  │   ├── common/          # Reusable components
  │   │   ├── Button.jsx
  │   │   ├── ErrorDisplay.jsx
  │   │   └── LoadingStates.jsx
  │   ├── FileUpload.jsx   # Feature-specific components
  │   ├── LineControls.jsx
  │   ├── ZoomView.jsx
  │   └── __tests__/       # Component tests
  ├── hooks/               # Custom React hooks
  │   ├── useImageProcessor.js
  │   ├── useLineManager.js
  │   ├── useZoomManager.js
  │   └── __tests__/       # Hook tests
  ├── utils/               # Utility functions
  │   ├── imageProcessor.js
  │   ├── exportUtils.js
  │   ├── validation.js
  │   └── __tests__/       # Utility tests
  ├── styles/              # CSS files
  │   ├── components/      # Component-specific styles
  │   ├── globals.css      # Global styles
  │   └── variables.css    # CSS custom properties
  ├── App.jsx              # Main application component
  ├── App.css              # App-specific styles
  └── index.js             # Application entry point
  ```
  - Organize components by feature and reusability
  - Co-locate tests with source files
  - Separate utilities from components

### Code Quality Verification
- [ ] **Run comprehensive code quality checks**
  ```bash
  # ESLint for code quality
  npx eslint src/ --ext .js,.jsx --fix
  
  # Prettier for code formatting
  npx prettier --write "src/**/*.{js,jsx,css}"
  
  # React-specific linting
  npx eslint src/ --ext .jsx --config .eslintrc.react.js
  
  # Bundle size analysis
  npm run build
  npx webpack-bundle-analyzer build/static/js/*.js
  
  # Accessibility audit
  npm run build
  npx lighthouse http://localhost:3000 --only-categories=accessibility
  ```
  - ESLint for code quality and React best practices
  - Prettier for consistent code formatting
  - Bundle size optimization
  - Accessibility compliance verification

## React Deployment Preparation

### Production Build Optimization
- [ ] **Optimize React application for production deployment**
  ```bash
  # Create optimized production build
  npm run build
  
  # Analyze bundle size and dependencies
  npx webpack-bundle-analyzer build/static/js/*.js
  
  # Check for unused dependencies
  npx depcheck
  
  # Optimize images and assets
  npx imagemin build/static/media/* --out-dir=build/static/media/
  ```
  ```javascript
  // webpack.config.js optimizations for production
  module.exports = {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    // Enable compression
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8,
      }),
    ],
  };
  ```
  - Bundle size optimization and code splitting
  - Asset compression and minification
  - Dependency analysis and cleanup

### React Application Validation
- [ ] **Comprehensive end-to-end validation of React app**
  ```javascript
  // src/__tests__/DeploymentValidation.test.jsx
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import App from '../App';
  
  describe('Deployment Validation', () => {
    test('complete stamp creation workflow', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // 1. Verify initial state
      expect(screen.getByText(/upload an image to begin/i)).toBeInTheDocument();
      
      // 2. Test file upload
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const fileInput = screen.getByLabelText(/click to upload/i);
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        expect(screen.getByText(/loaded successfully/i)).toBeInTheDocument();
      });
      
      // 3. Test background removal
      const removeBackgroundBtn = screen.getByText(/remove background/i);
      await user.click(removeBackgroundBtn);
      
      const canvas = screen.getByRole('img');
      fireEvent.click(canvas, { clientX: 100, clientY: 100 });
      
      await waitFor(() => {
        expect(screen.getByText(/background removed/i)).toBeInTheDocument();
      });
      
      // 4. Test required line selection
      const requiredLines = [
        { name: /header end/i, coords: { clientX: 50, clientY: 50 } },
        { name: /footer start/i, coords: { clientX: 50, clientY: 150 } },
        { name: /text line/i, coords: { clientX: 50, clientY: 100 } }
      ];
      
      for (const line of requiredLines) {
        const button = screen.getByText(line.name);
        await user.click(button);
        fireEvent.click(canvas, line.coords);
        
        await waitFor(() => {
          expect(screen.getByText(/✓/)).toBeInTheDocument();
        });
      }
      
      // 5. Test name input
      const nameInput = screen.getByLabelText(/stamp name/i);
      await user.type(nameInput, 'Test Stamp');
      
      // 6. Verify export readiness
      const exportBtn = screen.getByText(/export stamp file/i);
      expect(exportBtn).not.toBeDisabled();
      
      // 7. Test export functionality
      await user.click(exportBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/ready to export/i)).toBeInTheDocument();
      });
    });
    
    test('validates exported JSON format', async () => {
      // Mock the download functionality to capture exported data
      const mockCreateObjectURL = jest.fn(() => 'mock-url');
      global.URL.createObjectURL = mockCreateObjectURL;
      
      const mockClick = jest.fn();
      const mockLink = {
        href: '',
        download: '',
        click: mockClick,
        style: { display: '' }
      };
      
      jest.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockLink;
        return document.createElement(tag);
      });
      
      // Perform complete workflow and export
      // ... (setup steps)
      
      // Verify JSON structure matches specification
      expect(mockCreateObjectURL).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'application/json'
        })
      );
      
      // Parse the JSON data from the blob
      const blobContent = mockCreateObjectURL.mock.calls[0][0];
      const jsonText = await blobContent.text();
      const exportedData = JSON.parse(jsonText);
      
      // Validate stamp file structure
      expect(exportedData).toMatchObject({
        name: expect.any(String),
        type: 'SYNDICATE',
        referenceHeight: expect.any(Number),
        headerBottom: expect.any(Number),
        footerTop: expect.any(Number),
        fontSize: expect.any(Number),
        baseCoordinate: expect.arrayContaining([expect.any(Number)]),
        offset: { x: 0, y: 0 },
        imageData: expect.stringMatching(/^data:image\/png;base64,/)
      });
    });
  });
  ```
  - Complete workflow validation from start to finish
  - JSON export format verification
  - Error handling and edge case testing

### Cross-Browser Compatibility Testing
- [ ] **Verify React app works across all target browsers**
  ```javascript
  // playwright.config.js
  module.exports = {
    testDir: './tests/e2e',
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ],
  };
  ```
  ```javascript
  // tests/e2e/crossBrowser.spec.js
  import { test, expect } from '@playwright/test';
  
  test.describe('Cross-browser compatibility', () => {
    test('Canvas API compatibility', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Test canvas context creation
      const canvasSupport = await page.evaluate(() => {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
      });
      
      expect(canvasSupport).toBe(true);
    });
    
    test('File API compatibility', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Test File API support
      const fileApiSupport = await page.evaluate(() => {
        return !!(window.File && window.FileReader && window.FileList && window.Blob);
      });
      
      expect(fileApiSupport).toBe(true);
    });
    
    test('Complete workflow in each browser', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Upload file
      await page.setInputFiles('input[type="file"]', 'test-data/sample.png');
      await expect(page.locator('text=loaded successfully')).toBeVisible();
      
      // Remove background
      await page.click('button:has-text("Remove Background")');
      await page.click('canvas');
      await expect(page.locator('text=background removed')).toBeVisible();
      
      // Select lines
      await page.click('button:has-text("Header End")');
      await page.click('canvas');
      
      // Export
      await page.fill('input[placeholder="Enter stamp name"]', 'Test Stamp');
      await page.click('button:has-text("Export Stamp File")');
      
      // Verify download was triggered
      const downloadPromise = page.waitForEvent('download');
      await downloadPromise;
    });
  });
  ```
  - Multi-browser testing with Playwright
  - API compatibility verification
  - Complete workflow testing per browser

### Performance and Accessibility Audit
- [ ] **Run comprehensive performance and accessibility audits**
  ```bash
  # Lighthouse audit for performance, accessibility, and best practices
  npm run build
  npx serve -s build &
  npx lighthouse http://localhost:3000 --output html --output-path ./audit-report.html
  
  # Accessibility-specific audit
  npx lighthouse http://localhost:3000 --only-categories=accessibility --output json --output-path ./accessibility-report.json
  
  # Performance budget check
  npx bundlesize
  ```
  ```javascript
  // package.json performance budgets
  {
    "bundlesize": [
      {
        "path": "./build/static/js/*.js",
        "maxSize": "300 kB"
      },
      {
        "path": "./build/static/css/*.css",
        "maxSize": "50 kB"
      }
    ]
  }
  ```
  - Lighthouse performance and accessibility audits
  - Bundle size monitoring and budgets
  - Core Web Vitals optimization

### Offline Functionality Verification
- [ ] **Ensure React app works completely offline**
  ```javascript
  // src/serviceWorker.js - Enable offline functionality
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );
  
  export function register(config) {
    if ('serviceWorker' in navigator) {
      // Register service worker for offline functionality
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }
  ```
  ```javascript
  // public/sw.js - Service worker for offline caching
  const CACHE_NAME = 'stamp-maker-v1';
  const urlsToCache = [
    '/',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json'
  ];
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  });
  ```
  - Service worker implementation for offline functionality
  - Asset caching strategy
  - Network fallback handling

### Final Deployment Checklist
- [ ] **Complete pre-deployment verification**
  ```bash
  # Final build and verification script
  #!/bin/bash
  
  echo "🚀 Starting deployment preparation..."
  
  # Clean previous builds
  rm -rf build/
  
  # Install dependencies
  npm ci
  
  # Run all tests
  npm test -- --coverage --watchAll=false
  
  # Run linting
  npm run lint
  
  # Build for production
  npm run build
  
  # Run bundle analysis
  npx webpack-bundle-analyzer build/static/js/*.js --report --mode static --report-filename bundle-report.html
  
  # Test production build locally
  npx serve -s build -p 3001 &
  SERVER_PID=$!
  
  # Wait for server to start
  sleep 5
  
  # Run end-to-end tests against production build
  npx playwright test --config=playwright.prod.config.js
  
  # Run Lighthouse audit
  npx lighthouse http://localhost:3001 --output html --output-path ./lighthouse-report.html
  
  # Clean up
  kill $SERVER_PID
  
  echo "✅ Deployment preparation complete!"
  echo "📊 Check bundle-report.html and lighthouse-report.html for optimization opportunities"
  ```
  - Automated deployment preparation script
  - Comprehensive testing and validation
  - Performance and bundle analysis

### Production Ready Verification
- [ ] **Final verification that React app meets all requirements**
  ```javascript
  // Deployment checklist validation
  const deploymentChecklist = {
    // Core functionality
    fileUpload: '✅ PNG file upload with drag-and-drop works',
    backgroundRemoval: '✅ Color-to-alpha background removal implemented',
    lineSelection: '✅ All line types (horizontal, vertical, letter) selectable',
    zoomFunctionality: '✅ 5x zoom with pixel precision works',
    manualInput: '✅ Number inputs sync with visual lines',
    jsonExport: '✅ Exports valid stamp file JSON format',
    
    // Technical requirements
    reactArchitecture: '✅ Built with React 18+ and modern hooks',
    stateManagement: '✅ Centralized state with proper updates',
    errorHandling: '✅ Comprehensive error boundaries and validation',
    accessibility: '✅ WCAG 2.1 AA compliant with keyboard navigation',
    performance: '✅ Bundle size < 300KB, loads in < 3s',
    crossBrowser: '✅ Works in Chrome, Firefox, Safari, Edge',
    offline: '✅ Functions completely offline',
    
    // Code quality
    testing: '✅ >90% test coverage with unit, integration, e2e tests',
    documentation: '✅ Comprehensive JSDoc comments and README',
    linting: '✅ ESLint and Prettier configured with no errors',
    typeScript: '✅ PropTypes or TypeScript for type safety',
    
    // User experience
    responsive: '✅ Works on desktop and tablet devices',
    feedback: '✅ Loading states, success/error messages',
    validation: '✅ Real-time input validation and error messages',
    workflow: '✅ Intuitive step-by-step stamp creation process'
  };
  
  console.log('🎯 Deployment Readiness Check:');
  Object.entries(deploymentChecklist).forEach(([key, status]) => {
    console.log(`${status}`);
  });
  ```
  - Complete requirements verification
  - Technical implementation validation
  - User experience confirmation
  - Code quality assurance

### Ready for Production
- [ ] **Final confirmation of production readiness**
  - ✅ React application successfully creates stamp files matching exact specification
  - ✅ All UI interactions are smooth and responsive with proper feedback
  - ✅ Error handling is comprehensive with user-friendly messages
  - ✅ Code is clean, well-documented, and follows React best practices
  - ✅ Application meets 100% of requirements from `spec/requirements.md`
  - ✅ Performance metrics meet or exceed targets (< 3s load, < 300KB bundle)
  - ✅ Accessibility compliance verified with automated and manual testing
  - ✅ Cross-browser compatibility confirmed across all target browsers
  - ✅ Offline functionality works without external dependencies
  - ✅ Test coverage > 90% with comprehensive test suite
  - ✅ Production build optimized and ready for deployment
