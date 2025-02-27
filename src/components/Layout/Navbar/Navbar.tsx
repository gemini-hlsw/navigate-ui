import './Navbar.scss';

import { useConfiguration } from '@gql/configs/Configuration';
import { clsx } from 'clsx';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Link, useNavigate } from 'react-router';

import { useSetAboutVisible } from '@/components/atoms/about';
import { useAlarmValue } from '@/components/atoms/alarm';
import { useIsLoggedIn, useSignout, useUser } from '@/components/atoms/auth';
import { useOdbTokenValue } from '@/components/atoms/odb';
import { useTheme } from '@/components/atoms/theme';

export default function Navbar() {
  const configuration = useConfiguration().data?.configuration;
  const [theme, toggleTheme] = useTheme();
  const user = useUser();
  const isLoggedIn = useIsLoggedIn();
  const signout = useSignout();
  const navigate = useNavigate();
  const toggleAboutVisible = useSetAboutVisible();

  // Will be removed in the future
  const odbToken = useOdbTokenValue();

  const alarm = useAlarmValue();

  const themeIcon: string = theme === 'dark' ? 'pi pi-moon' : 'pi pi-sun';

  function userSession() {
    if (isLoggedIn) {
      return signout();
    } else {
      return navigate('/login');
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
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      command: () => toggleAboutVisible(),
    },
  ];

  return (
    <nav className={clsx('top-bar', alarm && 'animate-error-bg')}>
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
        <span className="site">{configuration?.site ?? ''}</span>
      </div>
      <div className="center">
        <span className="observation">{configuration?.obsTitle ?? ''}</span>
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
          dropdownIcon="pi pi-chevron-down"
        ></SplitButton>
      </div>
    </nav>
  );
}
