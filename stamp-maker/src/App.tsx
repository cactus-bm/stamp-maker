import React, { useState, useCallback } from 'react';
import './App.css';
import { FileUpload } from './components/FileUpload';
import { BackgroundRemoval } from './components/BackgroundRemoval';
import { ZoomView } from './components/ZoomView';
import { LineSelection } from './components/LineSelection';
import { JsonExport } from './components/JsonExport';
import { ManualInputs } from './components/ManualInputs';
import { ErrorBoundary } from './components/ErrorBoundary';

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
    // Canvas click handling is delegated to individual components
    // This function exists to maintain the click handler structure
    // Individual components (BackgroundRemoval, LineSelection) handle their own click events
    console.log('Canvas clicked, current tool:', appState.ui.currentTool);
  }, [appState.ui.currentTool]);

  return (
    <ErrorBoundary>
      <div className="stamp-maker-app">
      <header className="app-header">
        <h1>Stamp Maker</h1>
        <p>Create stamp files from PNG images</p>
      </header>
      
      <main className="app-main">
        {/* Top: Long, thin file upload area */}
        <div className="file-upload-top">
          <FileUpload appState={appState} updateAppState={updateAppState} />
        </div>
        
        {/* Middle: 2/3 image preview + 1/3 tool selection */}
        <div className="main-workspace">
          <div className="image-section">
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
          
          <div className="tools-section">
            <BackgroundRemoval appState={appState} updateAppState={updateAppState} />
            <LineSelection appState={appState} updateAppState={updateAppState} />
          </div>
        </div>
        
        {/* Bottom: Manual coordinates and remaining controls */}
        <div className="bottom-controls">
          <ManualInputs appState={appState} updateAppState={updateAppState} />
          <JsonExport appState={appState} updateAppState={updateAppState} />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Stamp Maker v1.0 - Create stamp files with precision</p>
      </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
