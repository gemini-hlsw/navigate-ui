import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Apollo
import { ApolloProvider } from '@apollo/client';
import { client } from './gql/ApolloConfigs';

// Styles
import './styles/main.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Components
import AuthProvider from '@Contexts/Auth/AuthProvider';
import Layout from './components/Layout/Layout';
import Home from './components/Layout/Home/Home';
import Login from './components/Login/Login';
import VariablesProvider from '@Contexts/Variables/VariablesProvider';
import Token from './components/Token/Token';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [{ index: true, element: <Home /> }] },
  { path: '/login', element: <Login /> },
  { path: '/token', element: <Token /> },
]);

root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <VariablesProvider>
        <RouterProvider router={router} />
      </VariablesProvider>
    </ApolloProvider>
  </AuthProvider>,
);
