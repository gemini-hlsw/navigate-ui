import ReactDOM from 'react-dom/client';

// Apollo

// Styles
import './styles/main.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { App } from './App';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
