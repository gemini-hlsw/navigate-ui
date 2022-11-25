import { ThemeContext } from '../Theme/ThemeProvider';
import { useContext } from 'react';
import { Button } from 'primereact/button'

export default function Theme() {
  let theme = useContext(ThemeContext);

  let themeIcon: string = (theme.theme === "dark") ? "pi pi-moon" : "pi pi-sun"

  return (
    <Button
      label={theme.theme}
      icon={themeIcon}
      iconPos="right"
      className="p-button-text nav-btn"
      onClick={theme.toggleTheme}
    />
  )
}