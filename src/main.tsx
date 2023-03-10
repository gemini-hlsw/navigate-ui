import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink
} from '@apollo/client';

// Styles
import './styles/main.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Components
import AuthProvider from './components/Auth/AuthProvider';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Team from './components/Team';
import Teams from './components/Teams';
import Login from './components/Login/Login';
import ThemeProvider from './components/Theme/ThemeProvider';

const engageLink = new HttpLink({
  uri: '/graphqlapi/engage'
})

const rickAndMortyLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql'
})

const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "rickAndMorty",
    rickAndMortyLink,
    engageLink
  ),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider>
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
                {/* <Route index element={<LeagueStandings />} /> */}
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  </ThemeProvider>
);
