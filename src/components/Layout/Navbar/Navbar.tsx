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
import { ChevronDown, Info, Key, KeySolid, Map, Moon, SignIn, SignOut, Sun, User } from '@/components/Icons';

import { ConnectionLost } from './ConnectionLost';

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

  const ThemeIcon = theme === 'dark' ? Moon : Sun;
  const SignInIcon = isLoggedIn ? SignIn : SignOut;

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
      icon: <ThemeIcon className="p-menuitem-icon" />,
      command: toggleTheme,
    },
    {
      label: isLoggedIn ? 'Logout' : 'Login',
      icon: <SignInIcon className="p-menuitem-icon" />,
      command: userSession,
    },
    {
      label: 'ODB Token',
      icon: <KeySolid className="p-menuitem-icon" />,
      command: () => navigate('/token'),
    },
    {
      label: 'About',
      icon: <Info className="p-menuitem-icon" />,
      command: () => toggleAboutVisible(),
    },
  ];

  return (
    <nav className={clsx('top-bar', alarm && 'animate-error-bg')}>
      <div className="left">
        <Link to="/">
          <Button
            icon={<Map className="p-button-icon" size="lg" />}
            iconPos="left"
            className="p-button-text nav-btn main-title"
          >
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
        {configuration?.site && <span className="site">{configuration.site}</span>}
      </div>
      <div className="center">
        {configuration?.obsTitle && <span className="observation">{configuration.obsTitle}</span>}
        {configuration?.obsReference && <span className="observation-ref">{configuration.obsReference}</span>}
      </div>
      <div className="right">
        <ConnectionLost />
        {!odbToken && (
          <Link to="/token" style={{ animation: 'blink 1s infinite' }}>
            <Key />
          </Link>
        )}
        <SplitButton
          label={user ? user.displayName : 'Guest'}
          icon={<User size="lg" />}
          className="p-button-text nav-btn"
          model={items}
          dropdownIcon={<ChevronDown size="lg" />}
        ></SplitButton>
      </div>
    </nav>
  );
}
