import { createContext, useState, ReactNode } from "react";
import { Authentication } from "../../Helpers/Authentication";

interface AuthContextType {
  user: any;
  signin: (user: string, pass: string, callback: VoidFunction) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider ({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<any>(Authentication.getUser());

  let signin = async (username: string, password: string, callback: VoidFunction) => {
    let [user, message] = await Authentication.signin(username, password)
    if (message) {
      console.log(message)
    }
    setUser(user)
    callback()
  };

  let signout = () => {
    Authentication.signout()
    setUser(null)
  };

  let value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}