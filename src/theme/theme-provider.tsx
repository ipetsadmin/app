import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import * as SystemUI from "expo-system-ui";

import { storage } from "@/lib/storage";

import { palettes, type ColorScheme, type ThemeColors } from "./colors";

type ThemeContextValue = {
  /** Esquema activo aplicado a la UI. */
  scheme: ColorScheme;
  /** Tokens de color del esquema activo. */
  colors: ThemeColors;
  isDark: boolean;
  /** `null` = seguir al sistema; "light"/"dark" = forzado por el usuario. */
  preference: ColorScheme | null;
  /** Fuerza un esquema o vuelve a seguir el sistema con `null`. */
  setPreference: (preference: ColorScheme | null) => void;
  /** Alterna entre claro y oscuro (deja de seguir al sistema). */
  toggle: () => void;
};

const STORAGE_KEY = "theme-preference";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  forced,
}: {
  children: React.ReactNode;
  /** Fija un esquema para todo el subárbol, ignorando sistema y preferencia. */
  forced?: ColorScheme;
}) {
  const system: ColorScheme = useSystemColorScheme() === "dark" ? "dark" : "light";
  const [preference, setPreferenceState] = useState<ColorScheme | null>(null);

  // Carga la preferencia persistida al montar.
  useEffect(() => {
    storage.Async.get<ColorScheme>(STORAGE_KEY).then((saved) => {
      if (saved === "light" || saved === "dark") setPreferenceState(saved);
    });
  }, []);

  const setPreference = useCallback((next: ColorScheme | null) => {
    setPreferenceState(next);
    if (next == null) storage.Async.remove(STORAGE_KEY);
    else storage.Async.save(STORAGE_KEY, next);
  }, []);

  const scheme: ColorScheme = forced ?? preference ?? system;

  // Sincroniza el fondo nativo de la raíz con el tema (expo-system-ui).
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(palettes[scheme].background);
  }, [scheme]);

  const toggle = useCallback(() => {
    setPreference(scheme === "dark" ? "light" : "dark");
  }, [scheme, setPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      scheme,
      colors: palettes[scheme],
      isDark: scheme === "dark",
      preference,
      setPreference,
      toggle,
    }),
    [scheme, preference, setPreference, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}
