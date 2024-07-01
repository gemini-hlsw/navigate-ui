import { createContext, useState, ReactNode } from 'react';
import { Authentication } from './Authentication';

interface AuthContextType {
  user: any;
  signin: (user: string, pass: string) => Promise<boolean>;
  signout: () => void;
  isUserLoggedIn: boolean;
  canEdit: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(Authentication.getUser());
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(Boolean(Authentication.getUser()));

  const [canEdit, setCanEdit] = useState<boolean>(Authentication.canEdit());

  const signin = async (username: string, password: string) => {
    const [user] = await Authentication.signin(username, password);
    if (!user) return Promise.resolve(false);
    setUser(user);
    setIsUserLoggedIn(true);
    // Check if user can edit
    setCanEdit(true);
    return Promise.resolve(true);
  };

  const signout = async () => {
    await Authentication.signout();
    setUser(null);
    setCanEdit(false);
    setIsUserLoggedIn(false);
  };

  const value = { user, signin, signout, isUserLoggedIn, canEdit };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
