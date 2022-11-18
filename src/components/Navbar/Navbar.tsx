import { ThemeContext } from '../Theme/ThemeProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';
import { Button } from 'primereact/button'

const PAGE_REFS = [
  { title: 'Home', href: '/', icon: 'house' },
  { title: 'App', href: '/app', icon: 'house' },
  { title: 'Teams', href: '/teams', icon: 'house' },
  { title: 'Team123', href: '/teams/123', icon: 'house' }
];

export default function Navbar() {
  let t = useContext(ThemeContext);
  let auth = useContext(AuthContext);

  const logout = () => auth.signout();

  let normalLinks: JSX.Element[] = []
  PAGE_REFS.forEach((link, index) => {
    normalLinks.push(
      <li className="nav-item" key={`nav-link-${index}`}>
        <Link to={link.href} className="nav-link">
          <i className={`align-middle fs-4 bi-${link.icon}`}></i><span className="ms-1">{link.title}</span>
        </Link>
      </li>
    )
  })

  return (
    <nav className="top-bar">
      <div className="left">
        <Link to="/">
          <img src="/navigate.svg" alt="Navigate" width="20" style={{ verticalAlign: "-5px" }} />
          <span className="">&nbsp;Navigate</span>
        </Link>
        <span style={{marginLeft: "20px"}}>Site</span>
      </div>
      <div>
        <span>Observation</span>
      </div>
      <div className="right">
        <div>
          <span>Logout&nbsp;</span>
          <i className="pi pi-user"></i>
        </div>
      </div>
      {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {normalLinks}
          
        </ul>
      </div> */}
    </nav>
  );
}
