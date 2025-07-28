# Image Manipulation Web Application - Design Document

## Overview
This document outlines the technical design for a client-side React web application that creates stamp files from PNG images. The application focuses on background removal and precise line selection for stamp creation with user-entered data. The application will be built using React, HTML5 Canvas API, and modern JavaScript without requiring any backend services.

## System Architecture

### Application Structure
```
public/
  index.html        # Main HTML entry point
src/
  App.js            # Main React application component
  components/
    FileUpload.js   # File upload and drag-drop component
    ControlPanel.js # Main control panel container
    LineControls.js # Line selection buttons and inputs
    CanvasDisplay.js # Image display and canvas management
    ZoomView.js     # Zoom functionality component
  hooks/
    useImageProcessor.js # Custom hook for image manipulation
    useLineManager.js    # Custom hook for line selection
    useZoomManager.js    # Custom hook for zoom functionality
  utils/
    imageProcessor.js    # Image manipulation utilities
    dataExporter.js      # JSON export functionality
  styles/
    App.css         # Main application styles
    components.css  # Component-specific styles
package.json        # React dependencies and scripts
```

### Core Components

#### 1. Main Application Controller (`app.js`)
- **Purpose**: Orchestrates all application functionality
- **Responsibilities**:
  - Initialize application state
  - Handle file upload events
  - Coordinate between different modules
  - Manage UI state transitions
  - Handle button click events

#### 2. Image Processor (`imageProcessor.js`)
- **Purpose**: Handle image loading, display, and manipulation
- **Key Functions**:
  - `loadImage(file)`: Load PNG file into canvas
  - `removeBackground(imageData, targetColor)`: Perform color-to-alpha conversion using updated algorithm
  - `getPixelColor(x, y)`: Get color at specific coordinates
  - `storeOriginalImage()`: Store original image data
  - `storeProcessedImage()`: Store background-removed image data
  - `getBase64ImageData()`: Export processed image as base64 string

#### 3. Line Manager (`lineManager.js`)
- **Purpose**: Manage line selection, display, and coordinate storage
- **Key Functions**:
  - `enableLineSelection(type)`: Activate line selection mode
  - `drawOverlayLine(x, y, type)`: Draw preview line following cursor
  - `placeLine(x, y, type)`: Place and store line coordinates
  - `updateLinePosition(type, value)`: Update line from manual input
  - `renderAllLines()`: Redraw all placed lines

#### 4. Zoom Manager (`zoomManager.js`)
- **Purpose**: Provide small zoom screen for precise pixel selection
- **Key Functions**:
  - `showZoom(x, y)`: Display zoomed view around cursor position
  - `hideZoom()`: Hide zoom screen
  - `updateZoomPosition(x, y)`: Update zoom view as cursor moves
  - `getZoomedPixelColor(x, y)`: Get precise pixel color from zoom view

#### 5. Data Exporter (`dataExporter.js`)
- **Purpose**: Handle data serialization and JSON export
- **Key Functions**:
  - `collectData()`: Gather all application state
  - `exportToJSON()`: Create and download stamp file
  - `validateData()`: Ensure data completeness
  - `calculateFontSize()`: Calculate fontSize from textLine and topLine/headerEnd

## Data Models

### Application State
```javascript
const appState = {
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
}
```

### Stamp File Export Format
```javascript
{
  "name": "user-entered-name", // value entered in the name field
  "type": "SYNDICATE", // hard-coded to SYNDICATE
  "referenceHeight": 600, // height of the image
  "headerBottom": 150, // value chosen for headerEnd
  "footerTop": 250, // value chosen for footerStart
  "fontSize": 73, // value chosen for textLine - (topLine ?? headerBottom) 
  "leftStart": {
    "x": 100, // value chosen for leftStart 
    "y": 225 // value chosen for textLine
  },
  "rightStart": {
    "x": 700, // value chosen for rightStart
    "y": 225 // value chosen for textLine
  },
  "baseCoordinate": [
    {
      "x": 150, // value chosen for letterLine[0]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 250, // value chosen for letterLine[1]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 350, // value chosen for letterLine[2]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 450, // value chosen for letterLine[3]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 550, // value chosen for letterLine[4]
      "y": 225 // value chosen for textLine
    }
  ],
  "offset": { // hard-coded to 0
    "x": 0, 
    "y": 0
  },
  "imageData": "" // base64 encoded image data with background removed
}
```

## User Interface Design

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Header: Stamp Maker Tool                │
├─────────────────────────────────────────┤
│ File Upload Area (Drag & Drop)          │
├─────────────────────────────────────────┤
│ Control Panel:                          │
│ [Remove Background] [Name: _______]     │
│                                         │
│ Horizontal Lines:                       │
│ [Header End] [123] [Footer Start] [456] │
│ [Text Line] [300] [Baseline] [457]      │
│ [Top Line] [122]                        │
│                                         │
│ Vertical Lines:                         │
│ [Left Start] [100] [Right Start] [700]  │
│ [Add Letter Lines] (toggle)             │
│ Letter Lines: [120] [140] [160] ...     │
│                                         │
│ [Save Stamp File]                       │
├─────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────┐             │
│ │                 │ │Zoom │             │
│ │  Image Display  │ │ 5x  │             │
│ │     Canvas      │ │     │             │
│ │                 │ └─────┘             │
│ └─────────────────┘                     │
└─────────────────────────────────────────┘
```

### Canvas Implementation
- **Primary Canvas**: Display the loaded image
- **Overlay Canvas**: Draw selection lines and UI feedback
- **Hidden Canvas**: Store original image data for processing

## Technical Implementation Details

### File Upload Handling
```javascript
// Drag and drop implementation
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files[0] && files[0].type === 'image/png') {
    loadImage(files[0]);
  }
});
```

### Background Removal Algorithm
```javascript
function removeBackground(imageData, targetColour) {
  const [tr, tg, tb] = targetColor.map(c => c / 255);
  const result = new ImageData(imageData.width, imageData.height);
  const data = result.data;
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i] / 255;
    const g = imageData.data[i + 1] / 255;
    const b = imageData.data[i + 2] / 255;

    let alphaRatio = 1;
    if (tr > 0) alphaRatio = Math.min(alphaRatio, r / tr);
    if (tg > 0) alphaRatio = Math.min(alphaRatio, g / tg);
    if (tb > 0) alphaRatio = Math.min(alphaRatio, b / tb);
    
    alphaRatio = Math.min(alphaRatio, 1); // Clamp
    const alpha = 1 - alphaRatio;
    const newR = (r - tr * (1 - alpha)) / (alpha || 1);
    const newG = (g - tg * (1 - alpha)) / (alpha || 1);
    const newB = (b - tb * (1 - alpha)) / (alpha || 1);

    data[i]     = Math.round(Math.max(0, Math.min(1, newR)) * 255);
    data[i + 1] = Math.round(Math.max(0, Math.min(1, newG)) * 255);
    data[i + 2] = Math.round(Math.max(0, Math.min(1, newB)) * 255);
    data[i + 3] = Math.round(alpha * 255);
  }
  
  return result;
}
```

### Line Selection System
```javascript
class LineManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.activeMode = null;
    this.lines = {};
    this.setupEventListeners();
  }
  
  enableMode(mode) {
    this.activeMode = mode;
    this.canvas.style.cursor = mode.includes('vertical') ? 'col-resize' : 'row-resize';
  }
  
  handleMouseMove(e) {
    if (!this.activeMode) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.drawPreviewLine(x, y, this.activeMode);
  }
  
  handleClick(e) {
    if (!this.activeMode) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.placeLine(x, y, this.activeMode);
  }
}
```

### Manual Input Synchronization
```javascript
function setupManualInputs() {
  document.querySelectorAll('input[type="number"].line-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const lineType = e.target.dataset.lineType;
      const value = parseInt(e.target.value);
      
      if (!isNaN(value) && value >= 0) {
        lineManager.updateLinePosition(lineType, value);
        lineManager.renderAllLines();
        
        // Update application state
        appState.lines[lineType] = value;
      }
    });
  });
}
```

### Zoom Functionality Implementation
```javascript
class ZoomManager {
  constructor(canvas, zoomCanvas) {
    this.mainCanvas = canvas;
    this.zoomCanvas = zoomCanvas;
    this.zoomFactor = 5;
    this.zoomSize = 100; // 100x100 pixel zoom area
    this.visible = false;
  }
  
  showZoom(x, y) {
    this.visible = true;
    this.updateZoomPosition(x, y);
    this.zoomCanvas.style.display = 'block';
  }
  
  hideZoom() {
    this.visible = false;
    this.zoomCanvas.style.display = 'none';
  }
  
  updateZoomPosition(x, y) {
    if (!this.visible) return;
    
    const ctx = this.zoomCanvas.getContext('2d');
    const mainCtx = this.mainCanvas.getContext('2d');
    
    // Clear zoom canvas
    ctx.clearRect(0, 0, this.zoomCanvas.width, this.zoomCanvas.height);
    
    // Calculate source area (centered on cursor)
    const sourceSize = this.zoomSize / this.zoomFactor;
    const sourceX = x - sourceSize / 2;
    const sourceY = y - sourceSize / 2;
    
    // Draw zoomed portion
    ctx.imageSmoothingEnabled = false; // Pixelated zoom
    ctx.drawImage(
      this.mainCanvas,
      sourceX, sourceY, sourceSize, sourceSize,
      0, 0, this.zoomCanvas.width, this.zoomCanvas.height
    );
    
    // Draw crosshair
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 1;
    const centerX = this.zoomCanvas.width / 2;
    const centerY = this.zoomCanvas.height / 2;
    
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY);
    ctx.lineTo(centerX + 10, centerY);
    ctx.moveTo(centerX, centerY - 10);
    ctx.lineTo(centerX, centerY + 10);
    ctx.stroke();
  }
  
  getZoomedPixelColor(x, y) {
    const ctx = this.mainCanvas.getContext('2d');
    const imageData = ctx.getImageData(x, y, 1, 1);
    return {
      r: imageData.data[0],
      g: imageData.data[1],
      b: imageData.data[2],
      a: imageData.data[3]
    };
  }
}
```

## Event Flow Diagrams

### Background Removal Flow
```
User clicks "Remove Background" 
    ↓
Button activates background mode
    ↓
User clicks pixel on image
    ↓
Get pixel color at click coordinates
    ↓
Process entire image for color matching
    ↓
Apply alpha transparency to matching pixels
    ↓
Update canvas display
    ↓
Deactivate background mode
```

### Line Selection Flow
```
User clicks line selection button
    ↓
Activate line selection mode
    ↓
Show preview line following mouse
    ↓
User clicks to place line
    ↓
Store line coordinates
    ↓
Update manual input field
    ↓
Render line on overlay canvas
    ↓
Deactivate selection mode
```

## Performance Considerations

### Image Processing Optimization
- Use `requestAnimationFrame` for smooth line preview updates
- Implement debouncing for manual input changes
- Cache original image data to avoid repeated file reads
- Use efficient pixel manipulation algorithms

### Memory Management
- Clear canvas contexts when switching modes
- Remove event listeners when components are destroyed
- Limit the number of letter lines to prevent memory issues

## Browser Compatibility
- **Minimum Requirements**: Modern browsers supporting HTML5 Canvas and File API
- **Tested Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Fallbacks**: Graceful degradation for older browsers with feature detection

## Error Handling

### File Upload Errors
- Invalid file type detection
- File size limitations
- Corrupted image handling

### Processing Errors
- Canvas context failures
- Memory limitations for large images
- Invalid coordinate inputs

### User Experience
- Clear error messages
- Progress indicators for long operations
- Undo functionality for accidental actions

## Testing Strategy

### Unit Tests
- Image processing functions
- Coordinate calculation utilities
- Data export/import functions

### Integration Tests
- File upload workflow
- Line selection interactions
- JSON export validation

### User Acceptance Tests
- Complete workflow testing
- Cross-browser compatibility
- Accessibility compliance

## Future Enhancements
- Support for additional image formats
- Advanced color matching algorithms
- Keyboard shortcuts for power users
- Batch processing capabilities
- Export to additional formats (CSV, XML)
