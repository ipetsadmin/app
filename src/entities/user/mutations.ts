import type { PatchUserProfileInput } from "@ipetsadmin/contracts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mutationKeys, queryKeys } from "@/constants";
import { api, unwrap } from "@/lib/http";

import { useAuthed } from "../shared";

/**
 * Actualiza el perfil (`PATCH /api/v1/users/me/profile`).
 * Importante: el backend rechaza `avatar`, no lo incluyas en el body.
 */
export function useUpdateProfile() {
  const { accessToken } = useAuthed();
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.profile.update,
    mutationFn: (body: PatchUserProfileInput) => {
      if (!accessToken) throw new Error("No autenticado");
      return api.users.patchProfile(accessToken, body).then(unwrap);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.profile.all }),
  });
}
