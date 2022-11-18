import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "primereact/resources/themes/lara-dark-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import App from './App'
// import reportWebVitals from './reportWebVitals';
import AuthProvider from './components/Auth/AuthProvider';
import RequireAuth from './components/Auth/RequireAuth';
import Layout from './components/Layout/Layout';
import Home from './components/Home';
import Team from './components/Team';
import Teams from './components/Teams';
import LeagueStandings from './components/LeagueStandings';
import Login from './components/Login/Login';
import ThemeProvider from './components/Theme/ThemeProvider';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Home />} />
            <Route path="app" element={<App />}></Route>
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route index element={<LeagueStandings />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
