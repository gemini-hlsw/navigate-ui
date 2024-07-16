import { Link, useNavigate } from 'react-router-dom';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';
import { useTheme } from '@/components/atoms/theme';
import './Navbar.scss';
import { useOdbTokenValue } from '@/components/atoms/odb';
import { useConfigurationValue } from '@/components/atoms/configs';
import { useIsLoggedIn, useSignout, useUser } from '@/components/atoms/auth';

export default function Navbar() {
  const configuration = useConfigurationValue();
  const [theme, toggleTheme] = useTheme();
  const user = useUser();
  const isLoggedIn = useIsLoggedIn();
  const signout = useSignout();
  const navigate = useNavigate();

  // Will be removed in the future
  const odbToken = useOdbTokenValue();

  const themeIcon: string = theme === 'dark' ? 'pi pi-moon' : 'pi pi-sun';

  function userSession() {
    if (isLoggedIn) {
      signout();
    } else {
      navigate('/login');
    }
  }

  const items = [
    {
      label: 'Switch theme',
      icon: themeIcon,
      command: toggleTheme,
    },
    {
      label: isLoggedIn ? 'Logout' : 'Login',
      icon: isLoggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in',
      command: userSession,
    },
    {
      label: 'ODB Token',
      icon: 'pi pi-key',
      command: () => navigate('/token'),
    },
  ];

  return (
    <nav className="top-bar">
      <div className="left">
        <Link to="/">
          <Button icon="pi pi-map" iconPos="left" className="p-button-text nav-btn main-title">
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
        <span className="site">{configuration.site ?? ''}</span>
      </div>
      <div className="center">
        <span className="observation">{configuration.obsTitle ?? ''}</span>
      </div>
      <div className="right">
        {!odbToken && (
          <Link to="/token" style={{ animation: 'blink 1s infinite' }}>
            <i className="pi pi-key"></i>
          </Link>
        )}
        <SplitButton
          label={user ? user.displayName : 'Guest'}
          icon="pi pi-user"
          className="p-button-text nav-btn"
          model={items}
        ></SplitButton>
      </div>
    </nav>
  );
}
