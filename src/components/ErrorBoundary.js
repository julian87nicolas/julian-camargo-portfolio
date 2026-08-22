import { Component } from 'react';

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontFamily: 'var(--mono)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em'
                }}>
                    Something went wrong. Please reload the page.
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
