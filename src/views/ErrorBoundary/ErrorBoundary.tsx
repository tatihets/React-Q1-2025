import React, { Component, ReactNode } from 'react';

import './styles.scss';

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    console.log('HERRREEE');
    return { hasError: true, errorInfo: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error);
    this.setState({ errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          {this.state.errorInfo && (
            <details>{this.state.errorInfo.componentStack}</details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
