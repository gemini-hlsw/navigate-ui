import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../Theme/ThemeProvider';
import { useContext } from 'react';
import Navbar from '../Navbar/Navbar';

export default function Layout() {
  let t = useContext(ThemeContext);

  return (
    <div className="layout">
      <Navbar />
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
}
