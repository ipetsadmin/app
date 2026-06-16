import { ThemeProvider } from "@/theme";

import { AuthProvider } from "./auth-provider";

export { AuthProvider, useAuth } from "./auth-provider";
export type { Session, User } from "./auth-provider";

/** Agrupa todos los providers de la app en el orden correcto. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
