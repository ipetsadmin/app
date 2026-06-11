import { createContext, useCallback, useContext, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useSystemColorScheme();
  const [override, setOverride] = useState<ThemeMode | null>(null);
  const theme = override ?? (system === "dark" ? "dark" : "light");

  const toggleTheme = useCallback(
    () => setOverride((prev) => (prev ?? theme) === "dark" ? "light" : "dark"),
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
