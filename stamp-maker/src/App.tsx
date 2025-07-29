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
    setAppState(prevState => typeof updates === 'function' ? updates(prevState) : { ...prevState, ...updates });
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
        <div className="workspace">
          <FileUpload appState={appState} updateAppState={updateAppState} />
          
          <div className="image-workspace">
            <div className="canvas-and-zoom">
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
            
            <div className="line-tools">
              <LineSelection appState={appState} updateAppState={updateAppState} />
            </div>
          </div>
          
          <div className="controls-section">
            <BackgroundRemoval appState={appState} updateAppState={updateAppState} />
            
            <ManualInputs appState={appState} updateAppState={updateAppState} />
            
            <JsonExport appState={appState} updateAppState={updateAppState} />
          </div>
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
