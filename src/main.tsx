import { createRoot } from 'react-dom/client';
import { getEnvironment } from './Helpers/environment';

// Styles
import './styles/main.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { App } from './App';
import { StrictMode } from 'react';

const root = createRoot(document.getElementById('root')!);

const environment = getEnvironment();

root.render(
  <StrictMode>
    <App environment={environment} />
  </StrictMode>,
);
