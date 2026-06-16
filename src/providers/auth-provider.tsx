import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { storageKeys } from "@/constants";
import { storage } from "@/lib/storage";

/** Ajusta estos campos al shape real de tu usuario/sesión. */
export type User = {
  id: string;
  email: string;
  name?: string;
};

export type Session = {
  token: string;
  user: User;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  /** Guarda la sesión (token cifrado en SecureStore) y actualiza el estado. */
  signIn: (session: Session) => Promise<void>;
  /** Borra la sesión persistida y limpia el estado. */
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

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: session != null,
      signIn,
      signOut,
    }),
    [session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
