import './styles/main.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { createClient } from '@gql/ApolloConfigs';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { getEnvironment } from './Helpers/environment';

const root = createRoot(document.getElementById('root')!);

const client = createClient(getEnvironment());

root.render(
  <StrictMode>
    <App client={client} />
  </StrictMode>,
);
