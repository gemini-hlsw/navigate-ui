import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';

// More types can be added as needed
export type AlarmType = 'Guide';

const alarmAtom = atomWithReset<AlarmType | null>(null);
export const useAlarm = () => useAtom(alarmAtom);
export const useAlarmValue = () => useAtomValue(alarmAtom);

export const guideAlarmAtom = atom(
  (get) => get(alarmAtom) === 'Guide',
  (_get, set, value: boolean) => set(alarmAtom, value ? 'Guide' : RESET),
);
export const useGuideAlarm = () => useAtom(guideAlarmAtom);
export const useSetGuideAlarm = () => useSetAtom(guideAlarmAtom);
export const useGuideAlarmValue = () => useAtomValue(guideAlarmAtom);
