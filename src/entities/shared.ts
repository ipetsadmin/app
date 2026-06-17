import { useAuth } from "@/providers";

/**
 * Contexto de autenticación que consumen los hooks de `entities`: el access
 * token (que los métodos de `api` reciben por parámetro) y el id del usuario.
 * Las queries autenticadas usan `enabled: !!accessToken`.
 */
export function useAuthed() {
  const { accessToken, user } = useAuth();
  return { accessToken, userId: user?.id ?? null };
}
