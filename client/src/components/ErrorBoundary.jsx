import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', textAlign: 'center', marginTop: '10vh' }}>
                    <h1 style={{ color: '#ff4444' }}>Something went wrong.</h1>
                    <p>Please refresh the page.</p>
                    <pre style={{ textAlign: 'left', background: '#f0f0f0', padding: '1rem', overflow: 'auto', maxWidth: '800px', margin: '1rem auto' }}>
                        {this.state.error?.toString()}
                    </pre>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
