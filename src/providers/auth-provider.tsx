import type { AuthSessionResponse, AuthUserResponse } from "@ipetsadmin/contracts";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { storageKeys } from "@/constants";
import { api, unwrap } from "@/lib/http";
import { storage } from "@/lib/storage";

/** Usuario de sesión tal como lo devuelve el backend en login/register/me. */
export type User = AuthUserResponse;

/** Sesión persistida = payload de auth (tokens + user) de `@ipetsadmin/contracts`. */
export type Session = AuthSessionResponse;

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  /** Inicia sesión con email/contraseña contra el backend y persiste la sesión. */
  login: (email: string, password: string) => Promise<void>;
  /** Registra al usuario; el backend devuelve sesión, así que queda logueado. */
  register: (email: string, password: string) => Promise<void>;
  /** Revoca el refresh token en el backend (si hay) y limpia la sesión local. */
  logout: () => Promise<void>;
  /** Guarda una sesión ya obtenida (token cifrado en SecureStore) y actualiza el estado. */
  signIn: (session: Session) => Promise<void>;
  /** Borra la sesión persistida y limpia el estado (sin llamar al backend). */
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialSession = null,
}: {
  children: React.ReactNode;
  /** Sesión ya restaurada en el bootstrap (precargada del SecureStore). */
  initialSession?: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);

  const signIn = useCallback(async (next: Session) => {
    await storage.Secure.save(storageKeys.authSession, next);
    setSession(next);
  }, []);

  const signOut = useCallback(async () => {
    await storage.Secure.remove(storageKeys.authSession);
    setSession(null);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const next = unwrap(await api.auth.login({ email, password }));
      await signIn(next);
    },
    [signIn],
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const next = unwrap(await api.auth.register({ email, password }));
      await signIn(next);
    },
    [signIn],
  );

  const logout = useCallback(async () => {
    const refreshToken = session?.refreshToken;
    if (refreshToken) {
      try {
        await api.auth.logout({ refreshToken });
      } catch {
        // Ignoramos errores de red: igual limpiamos la sesión local.
      }
    }
    await signOut();
  }, [session?.refreshToken, signOut]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      accessToken: session?.accessToken ?? null,
      isAuthenticated: true,
      login,
      register,
      logout,
      signIn,
      signOut,
    }),
    [session, login, register, logout, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
