import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const loadingGuideTargetAtom = atom(false);
export const useLoadingGuideTarget = () => useAtom(loadingGuideTargetAtom);
export const useLoadingGuideTargetValue = () => useAtomValue(loadingGuideTargetAtom);
export const useSetLoadingGuideTarget = () => useSetAtom(loadingGuideTargetAtom);
