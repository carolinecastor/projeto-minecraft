import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div
          style={{
            padding: '20px',
            margin: '10px',
            border: '2px solid #ff6b6b',
            borderRadius: '8px',
            backgroundColor: '#ffe0e0',
            fontFamily: "'Minecraft', monospace",
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#d63031', margin: '0 0 10px 0' }}>
            🚫 Algo deu errado!
          </h3>
          <p style={{ color: '#636e72', margin: '0 0 15px 0' }}>
            Um erro inesperado ocorreu na interface de crafting.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
              // Optionally reload the page or reset component state
              if (this.props.onReset) {
                this.props.onReset();
              }
            }}
            style={{
              background: '#00b894',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: "'Minecraft', monospace",
              fontSize: '14px'
            }}
          >
            🔄 Tentar Novamente
          </button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '15px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#636e72' }}>
                Detalhes do erro (desenvolvimento)
              </summary>
              <pre style={{
                background: '#f8f9fa',
                padding: '10px',
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto',
                marginTop: '10px'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;