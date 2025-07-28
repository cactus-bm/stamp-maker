# Image Manipulation Web Application - Design Document

## Overview
This document outlines the technical design for a client-side web application that performs basic image manipulation on PNG files. The application will be built using HTML5, CSS3, and JavaScript without requiring any backend services.

## System Architecture

### Application Structure
```
index.html          # Main HTML structure
styles.css          # Application styling
app.js              # Main application logic
imageProcessor.js   # Image manipulation utilities
lineManager.js      # Line selection and overlay management
dataExporter.js     # JSON export functionality
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
  - `removeBackground(x, y)`: Perform color-to-alpha conversion
  - `getPixelColor(x, y)`: Get color at specific coordinates
  - `applyColorToAlpha(targetColor)`: Convert color to transparency

#### 3. Line Manager (`lineManager.js`)
- **Purpose**: Manage line selection, display, and coordinate storage
- **Key Functions**:
  - `enableLineSelection(type)`: Activate line selection mode
  - `drawOverlayLine(x, y, type)`: Draw preview line following cursor
  - `placeLine(x, y, type)`: Place and store line coordinates
  - `updateLinePosition(type, value)`: Update line from manual input
  - `renderAllLines()`: Redraw all placed lines

#### 4. Data Exporter (`dataExporter.js`)
- **Purpose**: Handle data serialization and JSON export
- **Key Functions**:
  - `collectData()`: Gather all application state
  - `exportToJSON()`: Create and download JSON file
  - `validateData()`: Ensure data completeness

## Data Models

### Application State
```javascript
const appState = {
  image: {
    file: null,
    canvas: null,
    originalData: null,
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
    name: ''
  },
  settings: {
    backgroundRemoved: false,
    targetColor: null
  }
}
```

### JSON Export Format
```javascript
{
  "name": "user-entered-name", // value entered in the name field
  "type": "SYNDICATE", // hard-coded to SYNDICATE
  "referenceHeight": 600, // height of the image
  "headerBottom": 150, // value choosen for headerEnd
  "footerTop": 250, // value choosen for footerStart
  "fontSize": 73, // value choosen for textLine - (topLine ?? headerEnd) 
  "leftStart": {
    "x": 100, // value choosen for leftStart 
    "y": 225 // value chosen for textLine
  },
  "rightStart": {
    "x": 700, // value choosen for rightStart
    "y": 225 // value chosen for textLine
  },
  "baseCoordinate": [
    {
      "x": 150, // value choosen for letterLine[0]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 250, // value choosen for letterLine[1]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 350, // value choosen for letterLine[2]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 450, // value choosen for letterLine[3]
      "y": 225 // value chosen for textLine
    },
    {
      "x": 550, // value choosen for letterLine[4]
      "y": 225 // value chosen for textLine
    }
  ],
  "offset": { // hard-coded to 0
    "x": 0, 
    "y": 0
  },
  "imageData": "" // base64 encoded image data with background removed.
}
```

## User Interface Design

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Header: Image Manipulation Tool         │
├─────────────────────────────────────────┤
│ File Upload Area (Drag & Drop)          │
├─────────────────────────────────────────┤
│ Control Panel:                          │
│ [Remove Background] [Name: _______]     │
│                                         │
│ Horizontal Lines:                       │
│ [Header End] [___] [Footer Start] [___] │
│ [Text Line] [___] [Baseline] [___]      │
│ [Top Line] [___]                        │
│                                         │
│ Vertical Lines:                         │
│ [Left Start] [___] [Right Start] [___]  │
│ [Add Letter Lines] (toggle)             │
│                                         │
│ [Save JSON]                             │
├─────────────────────────────────────────┤
│                                         │
│        Image Display Canvas             │
│                                         │
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
  document.querySelectorAll('.line-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const lineType = e.target.dataset.lineType;
      const value = parseInt(e.target.value);
      
      if (!isNaN(value)) {
        lineManager.updateLinePosition(lineType, value);
        lineManager.renderAllLines();
      }
    });
  });
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
