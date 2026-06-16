import type { TFunction } from "i18next";
import { z } from "zod";

/** Crea el esquema de recuperación de contraseña con mensajes traducidos. */
export const createForgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
  });

export type ForgotPasswordValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
