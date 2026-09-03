import './index.css';
import 'katex/dist/katex.min.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(<AppRouter />);
