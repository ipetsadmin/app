import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants";
import { api, unwrap } from "@/lib/http";

import { useAuthed } from "../shared";

/** Perfil persistido del usuario actual (`GET /api/v1/users/me/profile`). */
export function useProfile() {
  const { accessToken, userId } = useAuthed();
  return useQuery({
    queryKey: userId ? queryKeys.profile.detail(userId) : queryKeys.profile.all,
    queryFn: () => api.users.getProfile(accessToken!).then(unwrap),
    enabled: !!accessToken,
  });
}

/** Agenda del usuario para los próximos `days` días. */
export function useAgenda(days?: number) {
  const { accessToken } = useAuthed();
  return useQuery({
    queryKey: queryKeys.agenda.list(days),
    queryFn: () => api.users.getAgenda(accessToken!, days).then(unwrap),
    enabled: !!accessToken,
  });
}

/** Tip diario del usuario. */
export function useTip() {
  const { accessToken } = useAuthed();
  return useQuery({
    queryKey: queryKeys.tip.current,
    queryFn: () => api.users.getTip(accessToken!).then(unwrap),
    enabled: !!accessToken,
  });
}
