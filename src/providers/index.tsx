import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

import { AppSplash } from "@/components/app-splash";
import { storageKeys } from "@/constants";
import { loadSavedLanguage } from "@/lib/i18n";
import { storage } from "@/lib/storage";
import { ThemeProvider, type ColorScheme } from "@/theme";

import { AuthProvider, type Session } from "./auth-provider";

export { AuthProvider, useAuth } from "./auth-provider";
export type { Session, User } from "./auth-provider";

// Mantiene el splash nativo visible hasta que las preferencias estén cargadas.
SplashScreen.preventAutoHideAsync();

type Bootstrap = {
  themePreference: ColorScheme | null;
  session: Session | null;
};

/**
 * Precarga las preferencias persistidas (tema + sesión) antes del primer render
 * y recién entonces monta los providers, evitando el flash de tema incorrecto.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const [boot, setBoot] = useState<Bootstrap | null>(null);

  useEffect(() => {
    (async () => {
      const [saved, session] = await Promise.all([
        storage.Async.get<ColorScheme>(storageKeys.themePreference),
        storage.Secure.get<Session>(storageKeys.authSession),
        loadSavedLanguage(),
      ]);

      const themePreference = saved === "light" || saved === "dark" ? saved : null;
      // Aplica el esquema (incluida la capa nativa) antes de revelar la UI.
      // "unspecified" = seguir al sistema.
      Appearance.setColorScheme(themePreference ?? "unspecified");

      setBoot({ themePreference, session });
    })();
  }, []);

  // Una vez listos los providers, oculta el splash.
  useEffect(() => {
    if (boot) SplashScreen.hideAsync();
  }, [boot]);

  if (!boot) return null; // el splash nativo sigue en pantalla

  return (
    <ThemeProvider initialPreference={boot.themePreference}>
      <AuthProvider initialSession={boot.session}>
        {children}
        <AppSplash />
      </AuthProvider>
    </ThemeProvider>
  );
}
