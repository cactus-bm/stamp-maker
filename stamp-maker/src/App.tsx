import React, { useState, useCallback } from 'react';
import './App.css';
import { FileUpload } from './components/FileUpload';
import { BackgroundRemoval } from './components/BackgroundRemoval';
import { ZoomView } from './components/ZoomView';

// Application state interface
interface AppState {
  image: {
    original: ImageData | null;
    processed: ImageData | null;
    file: File | null;
    dimensions: { width: number; height: number } | null;
  };
  lines: {
    headerBottom: number | null;
    footerTop: number | null;
    textLine: number | null;
    baseline: number | null;
    topLine: number | null;
    leftStart: number | null;
    rightStart: number | null;
    letterLines: number[];
  };
  ui: {
    currentTool: 'none' | 'background' | 'header' | 'footer' | 'text' | 'baseline' | 'top' | 'left' | 'right' | 'letter';
    zoom: {
      active: boolean;
      x: number;
      y: number;
      scale: number;
    };
    loading: boolean;
    error: string | null;
  };
  export: {
    name: string;
    ready: boolean;
  };
}

// Initial application state
const initialState: AppState = {
  image: {
    original: null,
    processed: null,
    file: null,
    dimensions: null,
  },
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
  ui: {
    currentTool: 'none',
    zoom: {
      active: false,
      x: 0,
      y: 0,
      scale: 5,
    },
    loading: false,
    error: null,
  },
  export: {
    name: '',
    ready: false,
  },
};

function App() {
  const [appState, setAppState] = useState<AppState>(initialState);

  // State update function with validation
  const updateAppState = useCallback((updates: Partial<AppState> | ((prev: AppState) => AppState)) => {
    setAppState(prevState => {
      const newState = typeof updates === 'function' ? updates(prevState) : { ...prevState, ...updates };
      
      // Validate state consistency
      if (newState.lines && newState.image.dimensions) {
        const { height } = newState.image.dimensions;
        Object.entries(newState.lines).forEach(([key, value]) => {
          if (typeof value === 'number' && (value < 0 || value > height)) {
            console.warn(`Invalid line position for ${key}: ${value}`);
          }
        });
      }
      
      return newState;
    });
  }, []);

  // Handle canvas clicks for various tools
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    
    // Handle different tools
    switch (appState.ui.currentTool) {
      case 'background':
        // Background removal is handled by BackgroundRemoval component
        break;
      case 'header':
      case 'footer':
      case 'text':
      case 'baseline':
      case 'top':
      case 'left':
      case 'right':
      case 'letter':
        // Line selection will be handled by LineSelection component
        break;
      default:
        break;
    }
  }, [appState.ui.currentTool]);

  return (
    <div className="stamp-maker-app">
      <header className="app-header">
        <h1>Stamp Maker</h1>
        <p>Create stamp files from PNG images</p>
      </header>
      
      <main className="app-main">
        <div className="workspace">
          <FileUpload appState={appState} updateAppState={updateAppState} />
          
          <div className="image-workspace">
            <div className="canvas-container">
              <canvas 
                id="main-canvas" 
                className="main-canvas"
                style={{ border: '1px solid #ccc' }}
                onClick={handleCanvasClick}
              />
            </div>
            
            <ZoomView appState={appState} updateAppState={updateAppState} />
          </div>
          
          <div className="controls-section">
            <BackgroundRemoval appState={appState} updateAppState={updateAppState} />
            
            <div className="tool-controls">
              <h3>Line Selection Tools</h3>
              <button className="tool-btn" disabled>Select Header End</button>
              <button className="tool-btn" disabled>Select Footer Start</button>
              <button className="tool-btn" disabled>Select Text Line</button>
              <button className="tool-btn" disabled>Select Baseline</button>
              <button className="tool-btn" disabled>Select Top Line</button>
              <button className="tool-btn" disabled>Select Left Start</button>
              <button className="tool-btn" disabled>Select Right Start</button>
              <button className="tool-btn" disabled>Add Letter Line</button>
            </div>
            
            <div className="manual-inputs">
              <h3>Manual Coordinates</h3>
              <div className="input-group">
                <label>Header Bottom:</label>
                <input type="number" disabled />
              </div>
              <div className="input-group">
                <label>Footer Top:</label>
                <input type="number" disabled />
              </div>
              <div className="input-group">
                <label>Text Line:</label>
                <input type="number" disabled />
              </div>
              <div className="input-group">
                <label>Baseline:</label>
                <input type="number" disabled />
              </div>
              <div className="input-group">
                <label>Top Line:</label>
                <input type="number" disabled />
              </div>
              <div className="input-group">
                <label>Left Start:</label>
                <input type="number" disabled />
              </div>
              <div className="input-group">
                <label>Right Start:</label>
                <input type="number" disabled />
              </div>
            </div>
            
            <div className="export-section">
              <h3>Export</h3>
              <div className="input-group">
                <label>Stamp Name:</label>
                <input 
                  type="text" 
                  placeholder="Enter stamp name"
                  disabled
                />
              </div>
              <button className="export-btn" disabled>Export Stamp File</button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Stamp Maker v1.0 - Create stamp files with precision</p>
      </footer>
    </div>
  );
}

export default App;
