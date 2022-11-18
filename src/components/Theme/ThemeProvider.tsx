import { createContext, useState, ReactNode } from "react";
import { Theme } from "../../types";

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextType>(null!);

export default function AuthProvider ({ children }: { children: ReactNode }) {
  let [theme, setTheme] = useState<Theme>('dark');

  let value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      { children }
    </ThemeContext.Provider>
  );
}