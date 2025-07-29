import React, { useCallback, useRef, useState } from 'react';

interface FileUploadProps {
  appState: any;
  updateAppState: (updates: any) => void;
}

interface DragHandlers {
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
}

/**
 * FileUpload Hook
 * 
 * Provides drag-and-drop and click-to-upload functionality for the canvas.
 * Validates file type and size, loads image to canvas, and updates application state.
 * 
 * @param {FileUploadProps} props - Hook props
 * @returns {DragHandlers} Drag and drop event handlers for the canvas
 */
export const FileUpload: React.FC<FileUploadProps> = ({ appState, updateAppState }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  // Validate file type and size
  const validateFile = useCallback((file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select an image file';
    }
    
    if (!file.type.includes('png')) {
      return 'Please select a PNG image file';
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return 'File size must be less than 10MB';
    }
    
    return null;
  }, []);

  // Load image file and update state
  const loadImageFile = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      updateAppState({
        ui: { ...appState.ui, error: validationError, loading: false }
      });
      return;
    }

    updateAppState({
      ui: { ...appState.ui, loading: true, error: null }
    });

    try {
      const img = new Image();
      const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      const originalOnload = () => {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        
        // Update application state
        updateAppState({
          image: {
            original: imageData,
            processed: null,
            file: file,
            dimensions: { width: img.width, height: img.height }
          },
          ui: { 
            ...appState.ui, 
            loading: false, 
            error: null 
          }
        });
      };

      img.onload = () => {
        // Clean up object URL
        URL.revokeObjectURL(objectUrl);
        // Call the original onload function
        originalOnload();
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        updateAppState({
          ui: { 
            ...appState.ui, 
            loading: false, 
            error: 'Failed to load image. Please try a different file.' 
          }
        });
      };

      // Create object URL and load image
      const objectUrl = URL.createObjectURL(file);      
      img.src = objectUrl;

    } catch (error) {
      updateAppState({
        ui: { 
          ...appState.ui, 
          loading: false, 
          error: 'Failed to process image file' 
        }
      });
    }
  }, [appState, updateAppState, validateFile]);

  // Handle file input change
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadImageFile(file);
    }
  }, [loadImageFile]);

  // Handle click to open file dialog
  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  // Handle drop
  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      loadImageFile(imageFile);
    } else {
      updateAppState({
        ui: { 
          ...appState.ui, 
          error: 'Please drop a valid image file' 
        }
      });
    }
  }, [appState, updateAppState, loadImageFile]);

  const hasImage = appState.image.file !== null;
  const isLoading = appState.ui.loading;

  return (
    <div className="upload-section">
      {appState.ui.error && (
        <div className="error-message">
          {appState.ui.error}
        </div>
      )}
      
      <div 
        className={`file-upload-area ${dragOver ? 'drag-over' : ''} ${isLoading ? 'loading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Click to upload image or drag and drop"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          aria-label="File input for PNG images"
        />
        
        {isLoading ? (
          <div>
            <p>Loading image...</p>
          </div>
        ) : hasImage ? (
          <div>
            <p>✓ Image loaded successfully</p>
            <p className="file-info">
              {appState.image.file.name} 
              ({appState.image.dimensions?.width} × {appState.image.dimensions?.height})
            </p>
            <button className="upload-btn" type="button">
              Choose Different Image
            </button>
          </div>
        ) : (
          <div>
            <p>Upload a PNG image to begin creating your stamp file</p>
            <p className="upload-hint">
              Click here or drag and drop your PNG file
            </p>
            <button className="upload-btn" type="button">
              Click to Upload Image
            </button>
          </div>
        )}
      </div>
      
      <div className="image-info">
        <h4>Image Details</h4>
        <ul>
          <li><strong>File:</strong> {hasImage ? appState.image.file.name : 'No image loaded'}</li>
          <li><strong>Size:</strong> {hasImage ? `${appState.image.dimensions?.width} × ${appState.image.dimensions?.height} pixels` : 'No image loaded'}</li>
          <li><strong>File Size:</strong> {hasImage ? `${(appState.image.file.size / 1024).toFixed(1)} KB` : 'No image loaded'}</li>
        </ul>
      </div>
    </div>
  );
};
