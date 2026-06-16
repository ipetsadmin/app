/**
 * Claves de mutations (escrituras) para React Query / TanStack Query.
 * Útiles para `useMutation({ mutationKey })`, defaults globales y `isMutating`.
 *
 * @example
 * useMutation({ mutationKey: mutationKeys.auth.signIn, mutationFn: ... });
 */
export const mutationKeys = {
  auth: {
    signIn: ["auth", "sign-in"] as const,
    signUp: ["auth", "sign-up"] as const,
    signOut: ["auth", "sign-out"] as const,
    forgotPassword: ["auth", "forgot-password"] as const,
  },
  pets: {
    create: ["pets", "create"] as const,
    update: (id: string) => ["pets", "update", id] as const,
    remove: (id: string) => ["pets", "remove", id] as const,
  },
  profile: {
    update: ["profile", "update"] as const,
  },
} as const;
