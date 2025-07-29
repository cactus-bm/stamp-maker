import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import { FileUpload } from './components/FileUpload';
import { BackgroundRemoval } from './components/BackgroundRemoval';
import { ZoomView } from './components/ZoomView';
import { LineSelection } from './components/LineSelection';
import { JsonExport } from './components/JsonExport';
import { ManualInputs } from './components/ManualInputs';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StampCanvas, StampCanvasRef } from './components/StampCanvas';

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
  const stampCanvasRef = useRef<StampCanvasRef>(null);

  // State update function with validation
  const updateAppState = useCallback((updates: Partial<AppState> | ((prev: AppState) => AppState)) => {
    setAppState(prevState => typeof updates === 'function' ? updates(prevState) : { ...prevState, ...updates });
  }, []);

  // Handle canvas clicks for various tools
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const currentTool = appState.ui.currentTool;
    
    if (!canvas || !appState.image.dimensions || currentTool === 'none' || currentTool === 'background') {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = appState.image.dimensions.width / rect.width;
    const scaleY = appState.image.dimensions.height / rect.height;
    
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);

    // Ensure coordinates are within bounds
    const clampedX = Math.max(0, Math.min(x, appState.image.dimensions.width - 1));
    const clampedY = Math.max(0, Math.min(y, appState.image.dimensions.height - 1));

    switch (currentTool) {
      case 'header':
        updateAppState({
          lines: { ...appState.lines, headerBottom: clampedY }
        });
        break;
      case 'footer':
        updateAppState({
          lines: { ...appState.lines, footerTop: clampedY }
        });
        break;
      case 'text':
        updateAppState({
          lines: { ...appState.lines, textLine: clampedY }
        });
        break;
      case 'baseline':
        updateAppState({
          lines: { ...appState.lines, baseline: clampedY }
        });
        break;
      case 'top':
        updateAppState({
          lines: { ...appState.lines, topLine: clampedY }
        });
        break;
      case 'left':
        updateAppState({
          lines: { ...appState.lines, leftStart: clampedX }
        });
        break;
      case 'right':
        updateAppState({
          lines: { ...appState.lines, rightStart: clampedX }
        });
        break;
      case 'letter':
        const newLetterLines = [...appState.lines.letterLines, clampedX].sort((a, b) => a - b);
        updateAppState({
          lines: { ...appState.lines, letterLines: newLetterLines }
        });
        break;
    }
  }, [appState, updateAppState]);

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
                <StampCanvas 
                  ref={stampCanvasRef}
                  lines={appState.lines}
                  image={appState.image}
                  onClick={handleCanvasClick}
                  className="main-canvas"
                  style={{ position: 'relative' }}
                />
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
