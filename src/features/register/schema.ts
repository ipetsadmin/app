import type { TFunction } from "i18next";
import { z } from "zod";

/** Crea el esquema de registro con mensajes traducidos. */
export const createRegisterSchema = (t: TFunction) =>
  z.object({
    firstName: z.string().min(1, t("validation.firstNameRequired")),
    lastName: z.string().min(1, t("validation.lastNameRequired")),
    email: z
      .string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z
      .string()
      .min(1, t("validation.passwordRequired"))
      .min(8, t("validation.passwordMin")),
  });

export type RegisterValues = z.infer<ReturnType<typeof createRegisterSchema>>;
