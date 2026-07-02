'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
          <p className="text-sm text-[var(--color-muted)] mb-4">Something went wrong</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export class SectionErrorBoundary extends Component<Props & { sectionName: string }> {
  render() {
    return (
      <ErrorBoundary
        fallback={
          <div className="flex flex-col items-center justify-center h-dvh p-8 text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
              Failed to load {this.props.sectionName}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
              Please refresh the page
            </p>
          </div>
        }
      >
        {this.props.children}
      </ErrorBoundary>
    );
  }
}