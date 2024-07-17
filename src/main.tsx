import { createRoot } from 'react-dom/client';

// Styles
import './styles/main.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { App } from './App';
import { StrictMode } from 'react';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
