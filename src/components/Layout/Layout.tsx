import './Layout.scss';

import { Outlet } from 'react-router';

import { AlarmAudio } from './AlarmAudio';
import Navbar from './Navbar/Navbar';

export default function Layout() {
  return (
    <div className="layout">
      <AlarmAudio />
      <Navbar />
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
}
