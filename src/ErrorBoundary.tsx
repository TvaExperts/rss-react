import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <>
          <p>{error?.message}</p>
          <p>{errorInfo?.componentStack}</p>
        </>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
