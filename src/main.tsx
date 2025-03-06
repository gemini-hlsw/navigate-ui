import './styles/main.scss';

import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { createClient } from '@gql/ApolloConfigs';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { getEnvironment } from './Helpers/environment';

if (import.meta.env.DEV) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const root = createRoot(document.getElementById('root')!);

const client = createClient(getEnvironment());

root.render(
  <StrictMode>
    <App client={client} />
  </StrictMode>,
);
