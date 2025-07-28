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

## HTML Structure Implementation

### Basic Layout
- [ ] **Add header section with "Stamp Maker Tool" title**
  ```html
  <header>
    <h1>Stamp Maker Tool</h1>
  </header>
  ```

- [ ] **Create file upload area with drag-and-drop zone styling**
  ```html
  <section id="upload-area" class="upload-zone">
    <div class="upload-content">
      <p>Drag & Drop PNG file here or <button id="file-select-btn">Select File</button></p>
      <input type="file" id="file-input" accept=".png" style="display: none;">
      <div id="file-info" style="display: none;"></div>
    </div>
  </section>
  ```
  - Must accept PNG files only as per requirements
  - Users can drag and drop a PNG file into the application
  - The uploaded image is displayed on screen for manipulation

- [ ] **Add control panel container div**
  ```html
  <section id="control-panel" class="control-panel">
    <!-- All controls will be added here -->
  </section>
  ```

- [ ] **Create name input field (text type)**
  ```html
  <div class="name-section">
    <label for="name-input">Name:</label>
    <input type="text" id="name-input" placeholder="Enter name for stamp file">
  </div>
  ```
  - Text input box for entering a name associated with the image
  - This value will be exported in the "name" field of the stamp file

- [ ] **Add "Remove Background" button**
  ```html
  <div class="background-section">
    <button id="remove-bg-btn" class="action-btn">Remove Background</button>
    <span id="bg-status"></span>
  </div>
  ```
  - Initiates background removal mode
  - User clicks on a pixel in the image to select the color to remove
  - Small zoom screen will be displayed for precise pixel selection

- [ ] **Create horizontal lines section with buttons and number inputs**
  ```html
  <div class="horizontal-lines-section">
    <h3>Horizontal Lines:</h3>
    <div class="line-controls">
      <!-- Individual line controls will be added in form elements tasks -->
    </div>
  </div>
  ```
  - All horizontal line selections provide visual feedback with cursor-following lines
  - Y-coordinates are stored relative to original image dimensions (y=0 at top)

- [ ] **Create vertical lines section with buttons and number inputs**
  ```html
  <div class="vertical-lines-section">
    <h3>Vertical Lines:</h3>
    <div class="line-controls">
      <!-- Individual line controls will be added in form elements tasks -->
    </div>
    <div id="letter-lines-container">
      <!-- Dynamically added letter line inputs will appear here -->
    </div>
  </div>
  ```
  - X-coordinates are stored relative to original image dimensions

- [ ] **Add "Save Stamp File" button**
  ```html
  <div class="export-section">
    <button id="save-btn" class="primary-btn">Save Stamp File</button>
    <div id="export-status"></div>
  </div>
  ```
  - Exports all collected data to a JSON file with specific stamp file format

- [ ] **Create main canvas element for image display**
  ```html
  <div class="canvas-container">
    <canvas id="main-canvas"></canvas>
    <canvas id="overlay-canvas"></canvas>
  </div>
  ```
  - Main canvas displays the loaded image
  - Overlay canvas for drawing selection lines (lines drawn as overlays, not modifying original)
  - Application maintains original image data separate from visual overlay

- [ ] **Create zoom canvas element (initially hidden)**
  ```html
  <div id="zoom-container" class="zoom-container" style="display: none;">
    <canvas id="zoom-canvas" width="100" height="100"></canvas>
    <div class="zoom-label">Zoom 5x</div>
  </div>
  ```
  - 100x100 pixel zoom area with 5x magnification
  - Small zoomed view for precise pixel selection during all line operations

- [ ] **Add proper semantic HTML structure and accessibility attributes**
  ```html
  <!-- Add to existing elements -->
  <main role="main">
    <!-- All main content -->
  </main>
  
  <!-- Add ARIA labels -->
  <button aria-label="Remove background from image">Remove Background</button>
  <input aria-label="Y-coordinate for header end line" type="number">
  ```

### Form Elements
- [ ] **Add "Header End" button with corresponding number input**
  ```html
  <div class="line-control">
    <button id="header-end-btn" class="line-btn" data-line-type="headerEnd">Header End</button>
    <input type="number" id="header-end-input" class="line-input" data-line-type="headerEnd" min="0" placeholder="Y">
  </div>
  ```
  - Visual feedback: Horizontal line follows mouse cursor when button is active
  - Click to place horizontal line on image view (overlay only)
  - Store Y-coordinate, export as "headerBottom" in stamp file

- [ ] **Add "Footer Start" button with corresponding number input**
  ```html
  <div class="line-control">
    <button id="footer-start-btn" class="line-btn" data-line-type="footerStart">Footer Start</button>
    <input type="number" id="footer-start-input" class="line-input" data-line-type="footerStart" min="0" placeholder="Y">
  </div>
  ```
  - Store Y-coordinate, export as "footerTop" in stamp file

- [ ] **Add "Text Line" button with corresponding number input**
  ```html
  <div class="line-control">
    <button id="text-line-btn" class="line-btn" data-line-type="textLine">Text Line</button>
    <input type="number" id="text-line-input" class="line-input" data-line-type="textLine" min="0" placeholder="Y">
  </div>
  ```
  - Used for calculating fontSize and as Y-coordinate for leftStart/rightStart/baseCoordinate

- [ ] **Add "Baseline" button with corresponding number input (optional)**
  ```html
  <div class="line-control">
    <button id="baseline-btn" class="line-btn" data-line-type="baseline">Baseline</button>
    <input type="number" id="baseline-input" class="line-input" data-line-type="baseline" min="0" placeholder="Y (optional)">
  </div>
  ```
  - Default behavior: If not selected, defaults to 1 pixel below the footer start line

- [ ] **Add "Top Line" button with corresponding number input (optional)**
  ```html
  <div class="line-control">
    <button id="top-line-btn" class="line-btn" data-line-type="topLine">Top Line</button>
    <input type="number" id="top-line-input" class="line-input" data-line-type="topLine" min="0" placeholder="Y (optional)">
  </div>
  ```
  - Default behavior: If not selected, defaults to 1 pixel above the header end line
  - Used in fontSize calculation: fontSize = textLine - (topLine ?? headerBottom)

- [ ] **Add "Left Start" button with corresponding number input**
  ```html
  <div class="line-control">
    <button id="left-start-btn" class="line-btn" data-line-type="leftStart">Left Start</button>
    <input type="number" id="left-start-input" class="line-input" data-line-type="leftStart" min="0" placeholder="X">
  </div>
  ```
  - Vertical line selection, store X-coordinate
  - Export as leftStart: {x: value, y: textLine}

- [ ] **Add "Right Start" button with corresponding number input**
  ```html
  <div class="line-control">
    <button id="right-start-btn" class="line-btn" data-line-type="rightStart">Right Start</button>
    <input type="number" id="right-start-input" class="line-input" data-line-type="rightStart" min="0" placeholder="X">
  </div>
  ```
  - Export as rightStart: {x: value, y: textLine}

- [ ] **Add "Add Letter Lines" toggle button**
  ```html
  <div class="line-control">
    <button id="letter-lines-btn" class="toggle-btn" data-active="false">Add Letter Lines</button>
    <span class="toggle-status">Click to start adding letter lines</span>
  </div>
  ```
  - Continuous mode: While button is active, each click adds a new vertical line
  - Deactivation: Click the button again or click outside the image area

- [ ] **Create container for dynamically added letter line inputs**
  ```html
  <div id="letter-lines-list" class="letter-lines-list">
    <h4>Letter Lines:</h4>
    <div id="letter-inputs-container">
      <!-- Dynamic inputs will be added here like: -->
      <!-- <input type="number" class="letter-line-input" data-index="0" min="0" placeholder="X"> -->
    </div>
  </div>
  ```
  - Each letter line gets its own number input for manual adjustment
  - Export as baseCoordinate array: [{x: value, y: textLine}, ...]

- [ ] **Set all coordinate inputs to `type="number"` with appropriate min values**
  - All coordinate inputs must be `type="number"` for better UX
  - Set `min="0"` since coordinates cannot be negative
  - Manual input fields allow precise adjustment and update lines on screen
  - Input validation: non-negative integers only

## CSS Styling Implementation

### Layout Styling
- [ ] Style the header section with appropriate typography
- [ ] Create responsive grid layout for control panel
- [ ] Style the file upload drag-and-drop area with visual feedback
- [ ] Style buttons with consistent design and hover states
- [ ] Style number inputs with consistent appearance
- [ ] Position the main canvas in the display area
- [ ] Position and style the zoom canvas (100x100px, initially hidden)
- [ ] Add responsive design for different screen sizes

### Visual Feedback Styling
- [ ] Create CSS classes for active button states
- [ ] Style drag-over states for file upload area
- [ ] Add loading/processing visual indicators
- [ ] Style line overlays on canvas (different colors for different line types)
- [ ] Create zoom canvas styling with border and positioning

## Application State Management

### Core State Setup
- [ ] Initialize `appState` object with all required properties
- [ ] Create `image` state object (file, canvas, originalData, processedData, width, height)
- [ ] Create `lines` state object (headerEnd, footerStart, textLine, baseline, topLine, leftStart, rightStart, letterLines)
- [ ] Create `ui` state object (activeMode, name, zoomVisible, zoomPosition)
- [ ] Create `settings` state object (backgroundRemoved, targetColor)
- [ ] Implement state update functions with proper validation

## File Upload Implementation

### Drag and Drop Functionality
- [ ] Implement drag-over event handler with visual feedback
- [ ] Implement drag-leave event handler to remove visual feedback
- [ ] Implement drop event handler to process PNG files
- [ ] Add file type validation (PNG only)
- [ ] Add file size validation and error handling
- [ ] Implement traditional file input as fallback
- [ ] Display uploaded file name in UI

### Image Loading
- [ ] Create `loadImage(file)` function in imageProcessor.js
- [ ] Load image into HTML Image element
- [ ] Calculate and set canvas dimensions based on image size
- [ ] Draw image onto main canvas
- [ ] Store original image data in appState
- [ ] Update UI to show image dimensions
- [ ] Handle image loading errors gracefully

## Background Removal Implementation

### Color Selection
- [ ] Implement "Remove Background" button click handler
- [ ] Add click event listener to canvas for pixel selection
- [ ] Create `getPixelColor(x, y)` function to get color at coordinates
- [ ] Display selected color information in UI
- [ ] Show zoom view when in background removal mode

### Color-to-Alpha Algorithm
- [ ] Implement `removeBackground(imageData, targetColor)` function
- [ ] Calculate alpha ratio for each pixel based on target color
- [ ] Apply color-to-alpha conversion using the specified algorithm
- [ ] Handle edge cases (division by zero, color channel bounds)
- [ ] Store processed image data separately from original
- [ ] Update canvas display with background-removed image
- [ ] Add undo functionality to restore original image

## Zoom Functionality Implementation

### Zoom Manager Class
- [ ] Create `ZoomManager` class constructor with canvas references
- [ ] Implement `showZoom(x, y)` method to display zoom view
- [ ] Implement `hideZoom()` method to hide zoom view
- [ ] Implement `updateZoomPosition(x, y)` method for cursor tracking
- [ ] Set zoom factor to 5x magnification
- [ ] Create 100x100 pixel zoom display area

### Zoom Visual Features
- [ ] Implement pixelated zoom (disable image smoothing)
- [ ] Draw crosshair in center of zoom view
- [ ] Update zoom view in real-time as mouse moves
- [ ] Position zoom canvas relative to cursor or in fixed position
- [ ] Add zoom view for all line selection modes
- [ ] Implement `getZoomedPixelColor(x, y)` for precise color selection

## Line Selection Implementation

### Line Manager Class
- [ ] Create `LineManager` class with canvas and state references
- [ ] Implement `enableLineSelection(type)` method
- [ ] Implement `drawOverlayLine(x, y, type)` for preview lines
- [ ] Implement `placeLine(x, y, type)` to store coordinates
- [ ] Implement `updateLinePosition(type, value)` for manual input updates
- [ ] Implement `renderAllLines()` to redraw all placed lines

### Horizontal Line Selection
- [ ] Implement header end line selection with horizontal line preview
- [ ] Implement footer start line selection with horizontal line preview
- [ ] Implement text line selection with horizontal line preview
- [ ] Implement baseline selection (optional, defaults to footerStart + 1)
- [ ] Implement top line selection (optional, defaults to headerEnd - 1)
- [ ] Store Y-coordinates for all horizontal lines
- [ ] Update corresponding number inputs when lines are placed

### Vertical Line Selection
- [ ] Implement left start line selection with vertical line preview
- [ ] Implement right start line selection with vertical line preview
- [ ] Store X-coordinates for vertical boundary lines
- [ ] Update corresponding number inputs when lines are placed

### Letter Lines Implementation
- [ ] Implement "Add Letter Lines" toggle button functionality
- [ ] Enable continuous vertical line placement mode
- [ ] Store array of X-coordinates for letter lines
- [ ] Dynamically create number inputs for each letter line
- [ ] Allow removal of individual letter lines
- [ ] Implement click-outside-to-stop functionality

## Manual Input Synchronization

### Number Input Handlers
- [ ] Add event listeners to all number inputs
- [ ] Implement input validation (non-negative integers)
- [ ] Update line positions when input values change
- [ ] Sync input values with placed line coordinates
- [ ] Update canvas display when inputs change
- [ ] Handle invalid input values gracefully

### Real-time Updates
- [ ] Update appState when input values change
- [ ] Redraw lines immediately when inputs are modified
- [ ] Maintain consistency between visual lines and stored coordinates
- [ ] Validate coordinate bounds (within image dimensions)

## Data Export Implementation

### Data Collection
- [ ] Implement `collectData()` function to gather all application state
- [ ] Calculate `fontSize` as textLine - (topLine ?? headerBottom)
- [ ] Format coordinates according to stamp file specification
- [ ] Validate that all required data is present
- [ ] Handle optional fields (baseline, topLine) with defaults

### JSON Export
- [ ] Implement `exportToJSON()` function
- [ ] Create stamp file object with correct structure
- [ ] Set `type` field to "SYNDICATE" (hard-coded)
- [ ] Set `referenceHeight` to image height
- [ ] Map line coordinates to stamp file format
- [ ] Convert processed image to base64 string
- [ ] Set `offset` to {x: 0, y: 0} (hard-coded)

### File Download
- [ ] Create downloadable JSON file
- [ ] Set appropriate filename (e.g., "stamp_[name].json")
- [ ] Trigger browser download
- [ ] Handle download errors
- [ ] Show success/error messages to user

## Error Handling and Validation

### Input Validation
- [ ] Validate PNG file uploads
- [ ] Check image dimensions and file size limits
- [ ] Validate coordinate inputs are within image bounds
- [ ] Ensure required fields are filled before export
- [ ] Validate that lines are placed in logical order

### Error Messages
- [ ] Display user-friendly error messages
- [ ] Handle canvas context errors
- [ ] Handle file reading errors
- [ ] Handle export errors
- [ ] Provide clear instructions for fixing errors

## User Experience Enhancements

### Visual Feedback
- [ ] Show active mode indicators on buttons
- [ ] Display current coordinates in real-time
- [ ] Show progress indicators for long operations
- [ ] Highlight invalid inputs with visual cues
- [ ] Show success messages after successful operations

### Accessibility
- [ ] Add proper ARIA labels to all interactive elements
- [ ] Ensure keyboard navigation works for all controls
- [ ] Add alt text and descriptions where appropriate
- [ ] Test with screen readers
- [ ] Ensure sufficient color contrast

## Testing and Quality Assurance

### Functional Testing
- [ ] Test file upload with various PNG files
- [ ] Test background removal with different colors
- [ ] Test all line selection modes
- [ ] Test manual input synchronization
- [ ] Test zoom functionality accuracy
- [ ] Test JSON export with complete data
- [ ] Test error handling scenarios

### Cross-browser Testing
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Verify Canvas API compatibility
- [ ] Test File API functionality

### Performance Testing
- [ ] Test with large PNG files
- [ ] Test with many letter lines
- [ ] Verify smooth zoom updates
- [ ] Check memory usage during operations
- [ ] Optimize canvas rendering performance

## Documentation and Cleanup

### Code Documentation
- [ ] Add JSDoc comments to all functions
- [ ] Document function parameters and return values
- [ ] Add inline comments for complex algorithms
- [ ] Create usage examples in comments

### Final Cleanup
- [ ] Remove console.log statements
- [ ] Clean up unused CSS rules
- [ ] Optimize file organization
- [ ] Verify all tasks are completed
- [ ] Test complete workflow end-to-end

## Deployment Preparation

### Final Validation
- [ ] Verify all features work as specified in requirements
- [ ] Test complete stamp creation workflow
- [ ] Validate exported JSON matches specification exactly
- [ ] Ensure application works offline (no external dependencies)
- [ ] Test with sample stamp images from test_data folder

### Ready for Use
- [ ] Application successfully creates stamp files
- [ ] All UI interactions work smoothly
- [ ] Error handling is robust
- [ ] Code is clean and well-documented
- [ ] Application meets all requirements from spec/requirements.md
