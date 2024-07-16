import { ThemeType } from '@/types';
import { atom, useAtom, useAtomValue } from 'jotai';

const themeAtom = atom<ThemeType>('dark');
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return [theme, toggleTheme] as const;
};
export const useThemeValue = () => useAtomValue(themeAtom);
