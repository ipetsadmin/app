import type { VerifyEmailRequest } from "@ipetsadmin/contracts";
import { useMutation } from "@tanstack/react-query";

import { mutationKeys } from "@/constants";
import { api } from "@/lib/http";

/**
 * Verifica el email con el token/código (`PATCH /api/v1/auth/verify-email`).
 * Respuesta `void`, así que no se usa `unwrap`: solo se valida `success`.
 */
export function useVerifyEmail() {
  return useMutation({
    mutationKey: mutationKeys.auth.verifyEmail,
    mutationFn: async (body: VerifyEmailRequest) => {
      const res = await api.auth.verifyEmail(body);
      if (!res.success) {
        throw new Error(res.error ?? res.message ?? "Código inválido");
      }
      return res;
    },
  });
}
