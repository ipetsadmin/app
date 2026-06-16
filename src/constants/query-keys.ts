/**
 * Claves de queries (lecturas) para React Query / TanStack Query.
 * Usa los helpers para mantener una jerarquía consistente e invalidar por prefijo.
 *
 * @example
 * useQuery({ queryKey: queryKeys.pets.detail(id), queryFn: ... });
 * queryClient.invalidateQueries({ queryKey: queryKeys.pets.all });
 */
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
    session: ["auth", "session"] as const,
  },
  pets: {
    all: ["pets"] as const,
    list: (filters?: Record<string, unknown>) => ["pets", "list", filters ?? {}] as const,
    detail: (id: string) => ["pets", "detail", id] as const,
  },
  profile: {
    all: ["profile"] as const,
    detail: (id: string) => ["profile", "detail", id] as const,
  },
} as const;
