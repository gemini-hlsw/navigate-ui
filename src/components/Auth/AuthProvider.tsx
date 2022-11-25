import { createContext, useState, ReactNode } from "react";
import { Authentication } from "../../Helpers/Authentication";

interface AuthContextType {
  user: any;
  signin: (user: string, pass: string, callback: VoidFunction) => void;
  signout: () => void;
  isUserLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider ({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<any>(Authentication.getUser());
  let [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(Boolean(Authentication.getUser()))

  let signin = async (username: string, password: string, callback: VoidFunction) => {
    let [user, message] = await Authentication.signin(username, password)
    if (message) {
      console.log(message)
    }
    setUser(user)
    setIsUserLoggedIn(true)
    callback()
  };

  let signout = () => {
    Authentication.signout()
    setUser(null)
    setIsUserLoggedIn(false)
  };

  let value = { user, signin, signout, isUserLoggedIn };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}