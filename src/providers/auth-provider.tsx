import { useRouter } from "expo-router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { secureStore } from "@/src/libs/secure-store";

const TOKEN_KEY = "access_token";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    secureStore.get(TOKEN_KEY).then((stored) => {
      if (stored) setToken(stored);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(
    async (user: User, token: string) => {
      await secureStore.set(TOKEN_KEY, token);
      setUser(user);
      setToken(token);
      router.replace("/(app)/home");
    },
    [router],
  );

  const logout = useCallback(async () => {
    await secureStore.delete(TOKEN_KEY);
    setUser(null);
    setToken(null);
    router.replace("/(auth)/sign-in");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
