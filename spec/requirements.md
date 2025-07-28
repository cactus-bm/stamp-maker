# Image Manipulation Web Application Requirements

## Overview
This web application will provide basic image manipulation capabilities for PNG files, focusing on background removal and line selection for text processing and layout analysis.

## Core Functionality

### 1. Image Upload and Display
- Users can drag and drop a PNG file into the application
- The uploaded image is displayed on screen for manipulation
- The application maintains the original image data separate from the visual overlay

### 2. Background Removal (Color to Alpha)
- **Remove Background Button**: Initiates background removal mode
- **Pixel Selection**: User clicks on a pixel in the image to select the color to remove
- **Color Processing**: All pixels matching the selected color are converted to transparent (alpha)
- **Simplified Implementation**: Initial version can focus on removing white pixels specifically
- **Semi-transparency**: Colors similar to the selected color (e.g., grey when white is selected) become semi-transparent

### 3. Line Selection Interface

#### Header End Selection
- **Button**: "Select Header End"
- **Visual Feedback**: Horizontal line follows mouse cursor when button is active
- **Line Placement**: Click to place horizontal line on the image view (overlay only)
- **Data Storage**: Store the Y-coordinate of the selected line
- **Manual Input**: Text field to manually adjust the line position

#### Footer Start Selection
- **Button**: "Select Footer Start"
- **Visual Feedback**: Horizontal line follows mouse cursor when button is active
- **Line Placement**: Click to place horizontal line on the image view (overlay only)
- **Data Storage**: Store the Y-coordinate of the selected line
- **Manual Input**: Text field to manually adjust the line position

#### Text Line Selection
- **Button**: "Select Text Line"
- **Visual Feedback**: Horizontal line follows mouse cursor when button is active
- **Line Placement**: Click to place horizontal line on the image view (overlay only)
- **Data Storage**: Store the Y-coordinate of the selected line
- **Manual Input**: Text field to manually adjust the line position

#### Baseline Selection (Optional)
- **Button**: "Select Baseline"
- **Default Behavior**: If not selected, defaults to 1 pixel below the footer start line
- **Visual Feedback**: Horizontal line follows mouse cursor when button is active
- **Line Placement**: Click to place horizontal line on the image view (overlay only)
- **Data Storage**: Store the Y-coordinate of the selected line
- **Manual Input**: Text field to manually adjust the line position

#### Top Line Selection (Optional)
- **Button**: "Select Top Line"
- **Default Behavior**: If not selected, defaults to 1 pixel above the header end line
- **Visual Feedback**: Horizontal line follows mouse cursor when button is active
- **Line Placement**: Click to place horizontal line on the image view (overlay only)
- **Data Storage**: Store the Y-coordinate of the selected line
- **Manual Input**: Text field to manually adjust the line position

### 4. Vertical Line Selection

#### Left Start Selection
- **Button**: "Select Left Start"
- **Visual Feedback**: Vertical line follows mouse cursor when button is active
- **Line Placement**: Click to place vertical line on the image view (overlay only)
- **Data Storage**: Store the X-coordinate of the selected line
- **Manual Input**: Text field to manually adjust the line position

#### Right Start Selection
- **Button**: "Select Right Start"
- **Visual Feedback**: Vertical line follows mouse cursor when button is active
- **Line Placement**: Click to place vertical line on the image view (overlay only)
- **Data Storage**: Store the X-coordinate of the selected line
- **Manual Input**: Text field to manually adjust the line position

#### Letter Lines Selection
- **Button**: "Add Letter Lines" (toggle button)
- **Continuous Mode**: While button is active, each click adds a new vertical line
- **Visual Feedback**: Vertical line follows mouse cursor when button is active
- **Line Placement**: Click to place multiple vertical lines on the image view (overlay only)
- **Data Storage**: Store array of X-coordinates for all letter lines
- **Manual Input**: Text fields to manually adjust each line position
- **Deactivation**: Click the button again or click outside the image area to stop adding lines

### 5. Text Input
- **Name Field**: Text input box for entering a name associated with the image
- **Data Storage**: Store the entered name as part of the output data

### 6. Data Export
- **Save Button**: Exports all collected data to a JSON file
- **Data Structure**: Will be defined in the next phase (design note)
- **Included Data**:
  - Image metadata
  - All line coordinates (header end, footer start, text line, baseline, top line)
  - Vertical line coordinates (left start, right start, letter lines array)
  - Entered name
  - Background removal settings

## User Interface Requirements

### Visual Feedback
- All selection modes provide clear visual feedback with cursor-following lines
- Selected lines remain visible as overlays on the image
- Active selection mode is clearly indicated through button states
- Manual input fields are positioned next to their corresponding selection buttons

### Interaction Flow
1. User uploads PNG image
2. User removes background if needed
3. User selects horizontal lines (header, footer, text, baseline, top)
4. User selects vertical boundaries (left start, right start)
5. User adds letter separation lines
6. User enters name in text field
7. User saves data to JSON file

### Technical Considerations
- Lines are drawn as overlays on the image view, not modifying the original image data
- All coordinate data is stored relative to the original image dimensions
- The application maintains separation between visual presentation and data storage
- Manual input fields allow precise adjustment of line positions
- JSON export preserves all user selections and modifications

## Future Considerations
- The JSON output format will be specified in the upcoming design note
- Additional image manipulation features may be added in future iterations
- Support for other image formats may be considered later
