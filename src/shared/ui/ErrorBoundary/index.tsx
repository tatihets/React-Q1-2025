import React, { Component, ReactNode } from 'react';

import serverDown512 from '../../../assets/images/server-down-512.png';
import serverDown360 from '../../../assets/images/server-down-360.png';

import { Button } from '../Button';

import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', { error, info });
  }

  private handleFixButtonClick = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uups...Something went wrong</h2>
          <picture>
            <source srcSet={serverDown512} media="(min-width: 768px)" />
            <source srcSet={serverDown360} media="(min-width: 540px)" />
            <img src={serverDown360} alt="Server error" />
          </picture>
          <Button onClick={this.handleFixButtonClick}>Fix everything</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
