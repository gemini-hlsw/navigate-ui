import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Theme/ThemeProvider';
import { AuthContext } from '../Auth/AuthProvider';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';
import './Navbar.scss';

export default function Navbar() {
  let theme = useContext(ThemeContext);
  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  let themeIcon: string = (theme.theme === "dark") ? "pi pi-moon" : "pi pi-sun"

  function userSession() {
    if (auth.isUserLoggedIn) {
      auth.signout()
    } else {
      navigate("/login")
    }
  }

  const items = [
    {
      label: 'Switch theme',
      icon: themeIcon,
      command: theme.toggleTheme
    },
    {
      label: auth.isUserLoggedIn ? "Logout" : "Login",
      icon: auth.isUserLoggedIn ? "pi pi-sign-out" : "pi pi-sign-in",
      command: userSession
    }
  ]

  return (
    <nav className="top-bar">
      <div className="left">
        <Link to="/">
          <Button icon="pi pi-map" iconPos="left" className="p-button-text nav-btn main-title" >
            <span>N</span>
            <span>A</span>
            <span>V</span>
            <span>I</span>
            <span>G</span>
            <span>A</span>
            <span>T</span>
            <span>E</span>
          </Button>
        </Link>
        <span className="site">Site</span>
      </div>
      <div className="center">
        <span className="observation">Observation</span>
      </div>
      <div className="right">
        <SplitButton
          label={(auth.isUserLoggedIn) ? auth.user.displayName : "Guest"}
          icon="pi pi-user"
          className="p-button-text nav-btn"
          model={items}
        >
        </SplitButton>
      </div>
    </nav>
  );
}
