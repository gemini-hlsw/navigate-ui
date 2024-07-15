import { SlewFlags } from '@gql/configs/gen/graphql';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const slewFlagsAtom = atom<SlewFlags>({} as SlewFlags);
export const useSlewFlags = () => useAtom(slewFlagsAtom);
export const useSlewFlagsValue = () => useAtomValue(slewFlagsAtom);
export const useSetSlewFlags = () => useSetAtom(slewFlagsAtom);

export const slewVisibleAtom = atom(false);
export const useSlewVisible = () => useAtom(slewVisibleAtom);
export const useSlewVisibleValue = () => useAtomValue(slewVisibleAtom);
export const useSetSlewVisible = () => useSetAtom(slewVisibleAtom);
