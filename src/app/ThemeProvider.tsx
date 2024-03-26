import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const StorageKey = "features-color-theme";


/**
 * Возможные темы приложения описанные в App.css
 */
const supportedThemes = {
  light: "light",
  dark: "dark",
};

type ThemeType = keyof typeof supportedThemes;

const getTheme = (): ThemeType => {
  const theme = localStorage.getItem(StorageKey);
  if (theme && Object.values(supportedThemes).includes(theme)) {
    return theme as ThemeType;
  } else {
    localStorage.setItem(StorageKey, "light");
    return "light";
  }
};

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  supportedThemes: typeof supportedThemes;
  toggleTheme: () => void;
}>({
  theme: "light",
  setTheme: () => {},
  supportedThemes,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeType>(getTheme);

  const setTheme = useCallback((theme: ThemeType) => {
    localStorage.setItem(StorageKey, theme);
    setThemeState(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const contextValue = useMemo(
    () => ({ theme, setTheme, supportedThemes, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
