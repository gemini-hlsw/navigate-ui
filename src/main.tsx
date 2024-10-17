import { createRoot } from 'react-dom/client';
import { getEnvironment } from './Helpers/environment';
import { createClient } from '@gql/ApolloConfigs';

// Styles
import './styles/main.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { App } from './App';
import { StrictMode } from 'react';

const root = createRoot(document.getElementById('root')!);

const client = createClient(getEnvironment());

root.render(
  <StrictMode>
    <App client={client} />
  </StrictMode>,
);
