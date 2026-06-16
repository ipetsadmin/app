import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  /** `true` mientras se restaura la sesión persistida al arrancar. */
  isLoading: boolean;
  isAuthenticated: boolean;
  /** Guarda la sesión (token cifrado en SecureStore) y actualiza el estado. */
  signIn: (session: Session) => Promise<void>;
  /** Borra la sesión persistida y limpia el estado. */
  signOut: () => Promise<void>;
};

const SESSION_KEY = "auth-session";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaura la sesión guardada al montar.
  useEffect(() => {
    storage.Secure.get<Session>(SESSION_KEY)
      .then((saved) => setSession(saved))
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback(async (next: Session) => {
    await storage.Secure.save(SESSION_KEY, next);
    setSession(next);
  }, []);

  const signOut = useCallback(async () => {
    await storage.Secure.remove(SESSION_KEY);
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isLoading,
      isAuthenticated: session != null,
      signIn,
      signOut,
    }),
    [session, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
