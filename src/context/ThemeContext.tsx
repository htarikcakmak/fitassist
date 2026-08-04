import { createContext } from 'react';

export const ThemeContext = createContext({
  themeBg: '#d8c97f',
  themePrimary: '#6a9433',
  setTheme: (bg: string, primary: string) => {}
});