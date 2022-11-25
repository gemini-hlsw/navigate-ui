import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';
import { Button } from 'primereact/button';
import Theme from './Theme';
import './Navbar.scss';

// const PAGE_REFS = [
//   { title: 'Home', href: '/', icon: 'house' },
//   { title: 'App', href: '/app', icon: 'house' },
//   { title: 'Teams', href: '/teams', icon: 'house' },
//   { title: 'Team123', href: '/teams/123', icon: 'house' }
// ];

// let normalLinks: JSX.Element[] = []
// PAGE_REFS.forEach((link, index) => {
//   normalLinks.push(
//     <li className="nav-item" key={`nav-link-${index}`}>
//       <Link to={link.href} className="nav-link">
//         <i className={`align-middle fs-4 bi-${link.icon}`}></i><span className="ms-1">{link.title}</span>
//       </Link>
//     </li>
//   )
// })

export default function Navbar() {
  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  function userSession() {
    if (auth.isUserLoggedIn) {
      auth.signout()
    } else {
      navigate("/login")
    }
  }

  return (
    <nav className="top-bar">
      <div className="left">
        <Link to="/">
          <Button label="Navigate" icon="pi pi-map" iconPos="left" className="p-button-text nav-btn main-title" />
        </Link>
        <span className="p-text" style={{marginLeft: "20px"}}>Site</span>
      </div>
      <div className="center">
        <span className="p-text">Observation</span>
      </div>
      <div className="right">
        <Theme />
        <Button
          label={(auth.isUserLoggedIn) ? "Logout" : "Login"}
          icon="pi pi-user"
          iconPos="right"
          className="p-button-text nav-btn"
          onClick={userSession}
        />
      </div>
    </nav>
  );
}
