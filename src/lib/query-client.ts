import { QueryClient } from "@tanstack/react-query";

/**
 * Instancia única de React Query para toda la app.
 * Defaults pensados para móvil: reintentos acotados y un `staleTime` que evita
 * refetches agresivos al volver a montar pantallas.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60_000, // 1 min: los datos se consideran frescos
      gcTime: 5 * 60_000, // 5 min en caché tras quedar sin observadores
    },
    mutations: {
      retry: 0,
    },
  },
});
