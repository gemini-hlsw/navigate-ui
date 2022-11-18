import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { Card } from 'primereact/card';

interface LocationInterface {
  from: {
    pathname: string;
  }
}

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useContext(AuthContext);

  const from = (location.state as LocationInterface)?.from?.pathname ?? "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    auth.signin(username, password,
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      () => navigate(from, { replace: true })
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <input id="username" type="text" />
        <input id="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    </Card>
  );
}