import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
import { registerWebMCPTools } from './utils/webmcp';

registerWebMCPTools();

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(<AppRouter />);
