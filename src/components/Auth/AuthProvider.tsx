import { createContext, useState, ReactNode } from "react";
import { Authentication } from "../../Helpers/Authentication";

interface AuthContextType {
  user: any;
  signin: (user: string, pass: string) => Promise<boolean>;
  signout: () => void;
  isUserLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider ({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<any>(Authentication.getUser());
  let [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(Boolean(Authentication.getUser()))

  let signin = async (username: string, password: string) => {
    let [user, message] = await Authentication.signin(username, password)
    if (!Boolean(user)) return Promise.resolve(false)
    setUser(user)
    setIsUserLoggedIn(true)
    return Promise.resolve(true)
  };

  let signout = async () => {
    await Authentication.signout()
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