import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const StorageKey = "features-color-theme-mode";

const supportedThemeModes = {
  light: "light",
  dark: "dark",
};

type ThemeModeType = keyof typeof supportedThemeModes;

const getTheme = (): ThemeModeType => {
  const theme = localStorage.getItem(StorageKey);
  if (theme && Object.values(supportedThemeModes).includes(theme)) {
    return theme as ThemeModeType;
  } else {
    localStorage.setItem(StorageKey, "light");
    return "light";
  }
};

export const ThemeContext = createContext<{
  themeMode: ThemeModeType;
  setThemeMode: (theme: ThemeModeType) => void;
  supportedThemeModes: typeof supportedThemeModes;
  toggleTheme: () => void;
}>({
  themeMode: "light",
  setThemeMode: () => {},
  supportedThemeModes,
  toggleTheme: () => {},
});

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeModeType>(getTheme);

  const setThemeMode = useCallback((theme: ThemeModeType) => {
    localStorage.setItem(StorageKey, theme);
    setThemeModeState(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  }, [themeMode, setThemeMode]);

  const contextValue = useMemo(
    () => ({ themeMode, setThemeMode, supportedThemeModes, toggleTheme }),
    [themeMode, setThemeMode, toggleTheme]
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
