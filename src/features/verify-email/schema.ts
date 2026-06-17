import type { TFunction } from "i18next";
import { z } from "zod";

/** Crea el esquema de verificación de email (código OTP de 6 dígitos). */
export const createVerifyEmailSchema = (t: TFunction) =>
  z.object({
    code: z
      .string()
      .length(6, t("validation.codeLength"))
      .regex(/^\d+$/, t("validation.codeLength")),
  });

export type VerifyEmailValues = z.infer<ReturnType<typeof createVerifyEmailSchema>>;
