import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const odbVisibleAtom = atom(false);
export const useOdbVisible = () => useAtom(odbVisibleAtom);
export const useSetOdbVisible = () => useSetAtom(odbVisibleAtom);
export const useOdbVisibleValue = () => useAtomValue(odbVisibleAtom);

export const odbTokenAtom = atomWithStorage('odbToken', '');
export const useOdbToken = () => useAtom(odbTokenAtom);
export const useSetOdbToken = () => useSetAtom(odbTokenAtom);
export const useOdbTokenValue = () => useAtomValue(odbTokenAtom);
