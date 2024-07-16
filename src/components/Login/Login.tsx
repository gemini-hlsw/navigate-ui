import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './Login.scss';
import { useSignIn } from '../atoms/auth';

interface LocationInterface {
  from: {
    pathname: string;
  };
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const signin = useSignIn();
  const toast = useRef<Toast>(null);

  const from = (location.state as LocationInterface)?.from?.pathname ?? '/';

  function handleSubmit() {
    setLoading(true);
    signin(username, password).then((isLogged) => {
      if (isLogged) {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.)
        navigate(from, { replace: true });
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Login Error',
          detail: 'Wrong credentials',
        });
      }
      setLoading(false);
    });
  }

  function goHome() {
    navigate('/');
  }

  return (
    <div className="login">
      <Toast ref={toast} className="p-button-danger" />
      <div className="box">
        <div className="title">
          <div className="text">Navigate</div>
        </div>
        <div className="p-inputgroup mb-10">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="p-inputgroup mb-10">
          <span className="p-inputgroup-addon">
            <i className="pi pi-key"></i>
          </span>
          <Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="login-buttons">
          <div className="text-right w-100">
            <Button label="Submit" icon="pi pi-check" iconPos="right" onClick={handleSubmit} loading={loading} />
          </div>
          <div className="text-left w-100">
            <Button label="Cancel" icon="pi pi-times" iconPos="right" className=" p-button-danger" onClick={goHome} />
          </div>
        </div>
      </div>
    </div>
  );
}
