import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component - Catches JavaScript errors anywhere in the child component tree
 * 
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Error boundary wrapper component
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h2>Something went wrong</h2>
            <p>An unexpected error occurred in the Stamp Maker application.</p>
            
            <div className="error-details">
              <h3>Error Details:</h3>
              <p className="error-message">
                {this.state.error && this.state.error.toString()}
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="error-stack">
                  <summary>Stack Trace (Development Only)</summary>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
            </div>
            
            <div className="error-actions">
              <button 
                className="error-reset-btn"
                onClick={this.handleReset}
                type="button"
              >
                Try Again
              </button>
              
              <button 
                className="error-reload-btn"
                onClick={() => window.location.reload()}
                type="button"
              >
                Reload Page
              </button>
            </div>
            
            <div className="error-help">
              <h3>What you can do:</h3>
              <ul>
                <li>Try clicking "Try Again" to reset the application</li>
                <li>Reload the page to start fresh</li>
                <li>Make sure your image file is a valid PNG</li>
                <li>Check that your browser supports modern JavaScript features</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
