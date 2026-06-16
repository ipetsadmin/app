import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, useColorScheme as useSystemColorScheme } from "react-native";
import * as SystemUI from "expo-system-ui";

import { storageKeys } from "@/constants";
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

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialPreference = null,
}: {
  children: React.ReactNode;
  /** Preferencia ya cargada del storage (precargada en el bootstrap, evita flash). */
  initialPreference?: ColorScheme | null;
}) {
  const system: ColorScheme = useSystemColorScheme() === "dark" ? "dark" : "light";
  const [preference, setPreferenceState] = useState<ColorScheme | null>(initialPreference);

  const setPreference = useCallback((next: ColorScheme | null) => {
    setPreferenceState(next);
    // Propaga a la capa nativa (NativeTabs, controles del sistema, etc.).
    // "unspecified" = volver a seguir al sistema.
    Appearance.setColorScheme(next ?? "unspecified");
    if (next == null) storage.Async.remove(storageKeys.themePreference);
    else storage.Async.save(storageKeys.themePreference, next);
  }, []);

  const scheme: ColorScheme = preference ?? system;

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
