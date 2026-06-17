import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants";
import { api, unwrap } from "@/lib/http";

import { useAuthed } from "../shared";

/** Usuario autenticado actual (`GET /api/v1/auth/me`). */
export function useMe() {
  const { accessToken } = useAuthed();
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => api.auth.me(accessToken!).then(unwrap),
    enabled: !!accessToken,
  });
}
