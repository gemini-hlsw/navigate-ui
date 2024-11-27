import { Authentication } from '@Contexts/Auth/Authentication';
import type { Getter, Setter } from 'jotai';
import { atom, useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';

export const canEditAtom = atom(Authentication.canEdit());
export const useCanEdit = () => useAtomValue(canEditAtom);

const userAtom = atom(Authentication.getUser());
export const useUser = () => useAtomValue(userAtom);

const isLoggedInAtom = atom((get) => !!get(userAtom));
export const useIsLoggedIn = () => useAtomValue(isLoggedInAtom);

const signInF = async (_get: Getter, set: Setter, username: string, password: string) => {
  const [user] = await Authentication.signin(username, password);
  if (!user) return false;
  set(userAtom, user);

  // Check if user can edit
  set(canEditAtom, true);
  return true;
};
export const useSignIn = () => useAtomCallback(signInF);

const signoutF = async (_get: Getter, set: Setter) => {
  await Authentication.signout();
  set(userAtom, null);
  set(canEditAtom, false);
};
export const useSignout = () => useAtomCallback(signoutF);
