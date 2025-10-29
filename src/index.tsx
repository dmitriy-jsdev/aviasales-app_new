import ReactDOM from 'react-dom/client';
import App from './components/App/App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container with id="root" not found in index.html');
}

const root = ReactDOM.createRoot(container);
root.render(<App />);
