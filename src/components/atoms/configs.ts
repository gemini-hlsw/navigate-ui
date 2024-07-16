import { ConfigurationType, RotatorType, TargetType } from '@/types';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const configurationAtom = atom({} as ConfigurationType);
export const useConfiguration = () => useAtom(configurationAtom);
export const useSetConfiguration = () => useSetAtom(configurationAtom);
export const useConfigurationValue = () => useAtomValue(configurationAtom);

const baseTargetsAtom = atom<TargetType[]>([]);
export const useBaseTargets = () => useAtom(baseTargetsAtom);
export const useSetBaseTargets = () => useSetAtom(baseTargetsAtom);
export const useBaseTargetsValue = () => useAtomValue(baseTargetsAtom);

const oiTargetsAtom = atom<TargetType[]>([]);
export const useOiTargets = () => useAtom(oiTargetsAtom);
export const useSetOiTargets = () => useSetAtom(oiTargetsAtom);
export const useOiTargetsValue = () => useAtomValue(oiTargetsAtom);

const p1TargetsAtom = atom<TargetType[]>([]);
export const useP1Targets = () => useAtom(p1TargetsAtom);
export const useSetP1Targets = () => useSetAtom(p1TargetsAtom);
export const useP1TargetsValue = () => useAtomValue(p1TargetsAtom);

const p2TargetsAtom = atom<TargetType[]>([]);
export const useP2Targets = () => useAtom(p2TargetsAtom);
export const useSetP2Targets = () => useSetAtom(p2TargetsAtom);
export const useP2TargetsValue = () => useAtomValue(p2TargetsAtom);

const rotatorAtom = atom<RotatorType>({} as RotatorType);
export const useRotator = () => useAtom(rotatorAtom);
export const useSetRotator = () => useSetAtom(rotatorAtom);
export const useRotatorValue = () => useAtomValue(rotatorAtom);
