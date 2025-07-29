import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

interface StampCanvasProps {
  appState: any;
  onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface StampCanvasRef {
  stamp: HTMLCanvasElement | null;
  lines: HTMLCanvasElement | null;
}

/**
 * StampCanvas Component - Provides two overlapping canvases for stamp image and line overlays
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.appState - Application state object
 * @param {Function} props.onClick - Optional click handler for canvas interactions
 * @param {string} props.className - Optional CSS class name
 * @param {Object} props.style - Optional inline styles
 * @param {React.Ref} ref - Ref object exposing stamp and lines canvas elements
 * @returns {JSX.Element} Canvas component with stamp and lines canvases
 */
export const StampCanvas = forwardRef<StampCanvasRef, StampCanvasProps>(
  ({ appState, onClick, className, style }, ref) => {
    const stampCanvasRef = useRef<HTMLCanvasElement>(null);
    const linesCanvasRef = useRef<HTMLCanvasElement>(null);

    // Expose both canvases through the ref
    useImperativeHandle(ref, () => ({
      stamp: stampCanvasRef.current,
      lines: linesCanvasRef.current,
    }), []);

    // Update canvas dimensions when image dimensions change
    useEffect(() => {
      const stampCanvas = stampCanvasRef.current;
      const linesCanvas = linesCanvasRef.current;
      
      if (!stampCanvas || !linesCanvas || !appState.image.dimensions) {
        return;
      }

      const { width, height } = appState.image.dimensions;
      
      // Set canvas dimensions
      stampCanvas.width = width;
      stampCanvas.height = height;
      linesCanvas.width = width;
      linesCanvas.height = height;
      
      // Calculate display size to fit container while maintaining aspect ratio
      const maxWidth = 800;
      const maxHeight = 600;
      const aspectRatio = width / height;
      
      let displayWidth = width;
      let displayHeight = height;
      
      if (width > maxWidth) {
        displayWidth = maxWidth;
        displayHeight = maxWidth / aspectRatio;
      }
      
      if (displayHeight > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = maxHeight * aspectRatio;
      }
      
      // Apply display size to both canvases
      const canvasStyle = {
        width: `${displayWidth}px`,
        height: `${displayHeight}px`,
      };
      
      Object.assign(stampCanvas.style, canvasStyle);
      Object.assign(linesCanvas.style, canvasStyle);
      
    }, [appState.image.dimensions]);

    // Draw the stamp image on the stamp canvas
    useEffect(() => {
      const stampCanvas = stampCanvasRef.current;
      if (!stampCanvas || !appState.image.processed) {
        return;
      }

      const ctx = stampCanvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, stampCanvas.width, stampCanvas.height);
      
      // Draw the processed image
      ctx.putImageData(appState.image.processed, 0, 0);
    }, [appState.image.processed]);

    // Draw lines on the lines canvas
    useEffect(() => {
      const linesCanvas = linesCanvasRef.current;
      if (!linesCanvas || !appState.image.dimensions) {
        return;
      }

      const ctx = linesCanvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, linesCanvas.width, linesCanvas.height);

      const { lines } = appState;
      const { width, height } = appState.image.dimensions;

      // Draw horizontal lines
      ctx.lineWidth = 2;
      ctx.setLineDash([]);

      // Header bottom line
      if (lines.headerBottom !== null) {
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(0, lines.headerBottom);
        ctx.lineTo(width, lines.headerBottom);
        ctx.stroke();
        
        // Label
        ctx.fillStyle = '#ff0000';
        ctx.font = '12px Arial';
        ctx.fillText('Header End', 5, lines.headerBottom - 5);
      }

      // Footer top line
      if (lines.footerTop !== null) {
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(0, lines.footerTop);
        ctx.lineTo(width, lines.footerTop);
        ctx.stroke();
        
        ctx.fillStyle = '#ff0000';
        ctx.fillText('Footer Start', 5, lines.footerTop - 5);
      }

      // Text line
      if (lines.textLine !== null) {
        ctx.strokeStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(0, lines.textLine);
        ctx.lineTo(width, lines.textLine);
        ctx.stroke();
        
        ctx.fillStyle = '#00ff00';
        ctx.fillText('Text Line', 5, lines.textLine - 5);
      }

      // Baseline
      if (lines.baseline !== null) {
        ctx.strokeStyle = '#0000ff';
        ctx.beginPath();
        ctx.moveTo(0, lines.baseline);
        ctx.lineTo(width, lines.baseline);
        ctx.stroke();
        
        ctx.fillStyle = '#0000ff';
        ctx.fillText('Baseline', 5, lines.baseline - 5);
      }

      // Top line
      if (lines.topLine !== null) {
        ctx.strokeStyle = '#ff00ff';
        ctx.beginPath();
        ctx.moveTo(0, lines.topLine);
        ctx.lineTo(width, lines.topLine);
        ctx.stroke();
        
        ctx.fillStyle = '#ff00ff';
        ctx.fillText('Top Line', 5, lines.topLine - 5);
      }

      // Vertical lines
      ctx.strokeStyle = '#ffaa00';
      
      // Left start line
      if (lines.leftStart !== null) {
        ctx.beginPath();
        ctx.moveTo(lines.leftStart, 0);
        ctx.lineTo(lines.leftStart, height);
        ctx.stroke();
        
        ctx.fillStyle = '#ffaa00';
        ctx.save();
        ctx.translate(lines.leftStart + 5, 15);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Left Start', 0, 0);
        ctx.restore();
      }

      // Right start line
      if (lines.rightStart !== null) {
        ctx.beginPath();
        ctx.moveTo(lines.rightStart, 0);
        ctx.lineTo(lines.rightStart, height);
        ctx.stroke();
        
        ctx.fillStyle = '#ffaa00';
        ctx.save();
        ctx.translate(lines.rightStart - 15, 15);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Right Start', 0, 0);
        ctx.restore();
      }

      // Letter lines
      ctx.strokeStyle = '#aa00ff';
      lines.letterLines.forEach((x: number, index: number) => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        
        ctx.fillStyle = '#aa00ff';
        ctx.save();
        ctx.translate(x + 5, 30 + (index * 15));
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`Letter ${index + 1}`, 0, 0);
        ctx.restore();
      });
    }, [appState.lines, appState.image.dimensions]);

    return (
      <div className={`stamp-canvas-container ${className || ''}`} style={style}>
        <canvas
          ref={stampCanvasRef}
          id="main-canvas"
          className="stamp-canvas"
          style={{
            position: 'absolute',
            border: '1px solid #ccc',
            borderRadius: '4px',
            zIndex: 1,
          }}
          aria-label="Stamp image canvas"
        />
        <canvas
          ref={linesCanvasRef}
          className="lines-canvas"
          style={{
            position: 'absolute',
            pointerEvents: 'auto',
            zIndex: 2,
            borderRadius: '4px',
          }}
          onClick={onClick}
          aria-label="Lines overlay canvas"
        />
      </div>
    );
  }
);

StampCanvas.displayName = 'StampCanvas';
