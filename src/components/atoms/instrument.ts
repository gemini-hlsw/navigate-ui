import { InstrumentType } from '@/types';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const importInstrumentAtom = atom(false);
export const useImportInstrument = () => useAtom(importInstrumentAtom);
export const useSetImportInstrument = () => useSetAtom(importInstrumentAtom);
export const useImportInstrumentValue = () => useAtomValue(importInstrumentAtom);

const instrumentAtom = atom({} as InstrumentType);
export const useInstrument = () => useAtom(instrumentAtom);
export const useInstrumentValue = () => useAtomValue(instrumentAtom);
export const useSetInstrument = () => useSetAtom(instrumentAtom);
