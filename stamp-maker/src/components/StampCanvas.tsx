import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';

interface StampCanvasProps {
    lines: any;
    image: any;
    onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
    updateZoom?: (zoom: { x: number; y: number }) => void;
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
 * @param {Object} props.lines - lines to draw
 * @param {Object} props.image - image to draw
 * @param {Function} props.onClick - Optional click handler for canvas interactions
 * @param {Function} props.updateZoom - Optional zoom update handler for mouse movement
 * @param {string} props.className - Optional CSS class name
 * @param {Object} props.style - Optional inline styles
 * @param {React.Ref} ref - Ref object exposing stamp and lines canvas elements
 * @returns {JSX.Element} Canvas component with stamp and lines canvases
 */
export const StampCanvas = forwardRef<StampCanvasRef, StampCanvasProps>(
  ({ lines, image, onClick, updateZoom, className, style }, ref) => {
    const stampCanvasRef = useRef<HTMLCanvasElement>(null);
    const linesCanvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Expose both canvases through the ref
    useImperativeHandle(ref, () => ({
      stamp: stampCanvasRef.current,
      lines: linesCanvasRef.current,
    }), []);

    // Update canvas dimensions and draw image
    useEffect(() => {
      const stampCanvas = stampCanvasRef.current;
      const linesCanvas = linesCanvasRef.current;
      
      if (!stampCanvas || !linesCanvas || !image.dimensions) {
        return;
      }

      const { width, height } = image.dimensions;
      
      // Set canvas dimensions to actual image size
      stampCanvas.width = width;
      stampCanvas.height = height;
      linesCanvas.width = width;
      linesCanvas.height = height;

      const imageToDraw = image.processed || image.original;
      
      // Draw the processed image if available
      if (imageToDraw) {
        const ctx = stampCanvas.getContext('2d');
        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, stampCanvas.width, stampCanvas.height);
          
          // Draw the processed image
          ctx.putImageData(imageToDraw, 0, 0);
        }
      }
      
    }, [image, image.dimensions, image.processed, stampCanvasRef, linesCanvasRef, stampCanvasRef.current, linesCanvasRef.current]);

    // Draw lines on the lines canvas
    useEffect(() => {
      const linesCanvas = linesCanvasRef.current;
      if (!linesCanvas || !image.dimensions) {
        return;
      }

      const ctx = linesCanvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, linesCanvas.width, linesCanvas.height);

      const { width, height } = image.dimensions;

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
    }, [lines, image.dimensions]);

    // Handle mouse movement to update zoom coordinates
    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!updateZoom || !image.dimensions) {
        return;
      }

      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const x = Math.round((event.clientX - rect.left) * scaleX);
      const y = Math.round((event.clientY - rect.top) * scaleY);

      // Ensure coordinates are within bounds
      const clampedX = Math.max(0, Math.min(x, image.dimensions.width - 1));
      const clampedY = Math.max(0, Math.min(y, image.dimensions.height - 1)); 

      updateZoom({ x: clampedX, y: clampedY });
    }, [updateZoom, image.dimensions]);

    return (
      <div 
        ref={containerRef}
        className={`stamp-canvas-container ${className || ''}`} 
        style={{
          position: 'relative',
          display: 'inline-block',
          minHeight: '400px',
          minWidth: '800px',
          ...style
        }}
      >
        <canvas
          ref={stampCanvasRef}
          id="main-canvas"
          className="stamp-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
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
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto',
            zIndex: 2,
            borderRadius: '4px',
          }}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          aria-label="Lines overlay canvas"
        />
      </div>
    );
  }
);

StampCanvas.displayName = 'StampCanvas';
