import { Button } from 'primereact/button'
import { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';

export default function Footer() {
  let auth = useContext(AuthContext);

  return (
    <div className="footer">
      <Button
        disabled={!auth.isUserLoggedIn}
        icon="pi pi-cog"
        className="p-button-rounded p-button-text btn-small"
        aria-label="Settings"
      />
      <Button
        disabled={!auth.isUserLoggedIn}
        className="btn-small" label="Slew Telescope"
        aria-label="Slew Telescope"
      />
      <Button
        disabled={!auth.isUserLoggedIn}
        className="btn-small" label="Apply Parameters"
        aria-label="Apply Parameters"
      />
      <Button
        disabled={!auth.isUserLoggedIn}
        className="btn-small p-button-danger right" label="Shutdown"
        aria-label="Shutdown"
      />
    </div>
  )
}