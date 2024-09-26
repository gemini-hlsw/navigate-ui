import { ApolloProvider } from '@apollo/client';
import { Modals } from '@Contexts/Variables/Modals/Modals';
import { createClient } from '@gql/ApolloConfigs';
import { useEffect, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useThemeValue } from './components/atoms/theme';
import type { Environment } from './Helpers/environment';

// Components
import Home from './components/Layout/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Token from './components/Token/Token';
import { ToastProvider } from './Helpers/toast';

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [{ index: true, element: <Home /> }] },
  { path: '/login', element: <Login /> },
  { path: '/token', element: <Token /> },
]);

export function App({ environment }: { environment: Environment }) {
  const client = useMemo(() => createClient(environment), [environment]);

  const theme = useThemeValue();
  // Re-render on theme change
  useEffect(() => {
    document.body.classList.value = theme;
  }, [theme]);

  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <Modals />
        <RouterProvider router={router} />
      </ToastProvider>
    </ApolloProvider>
  );
}
