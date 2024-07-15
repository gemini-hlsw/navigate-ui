import { ApolloProvider } from '@apollo/client';
import { Modals } from '@Contexts/Variables/Modals/Modals';
import { client } from '@gql/ApolloConfigs';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useThemeValue } from './components/atoms/theme';

// Components
import Home from './components/Layout/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Token from './components/Token/Token';

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [{ index: true, element: <Home /> }] },
  { path: '/login', element: <Login /> },
  { path: '/token', element: <Token /> },
]);

export function App() {
  const theme = useThemeValue();
  // Re-render on theme change
  useEffect(() => {
    document.body.classList.value = theme;
  }, [theme]);

  return (
    <ApolloProvider client={client}>
      <Modals />
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
