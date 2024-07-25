import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import './Layout.scss';
import { AlarmAudio } from './AlarmAudio';

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
