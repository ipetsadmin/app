import type { TFunction } from "i18next";
import { z } from "zod";

/** Crea el esquema de inicio de sesión con mensajes traducidos. */
export const createSignInSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z
      .string()
      .min(1, t("validation.passwordRequired"))
      .min(8, t("validation.passwordMin")),
  });

export type SignInValues = z.infer<ReturnType<typeof createSignInSchema>>;
