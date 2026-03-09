import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

type Mode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'light',
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    try {
      return (localStorage.getItem('ezbid-theme') as Mode) || 'light';
    } catch {
      return 'light';
    }
  });

  const toggleMode = useMemo(
    () => () => {
      setMode((prev) => {
        const next = prev === 'light' ? 'dark' : 'light';
        try {
          localStorage.setItem('ezbid-theme', next);
        } catch {}
        return next;
      });
    },
    []
  );

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
