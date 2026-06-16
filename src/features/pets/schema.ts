import type { TFunction } from "i18next";
import { z } from "zod";

/** Crea el esquema de "nueva mascota" con mensajes traducidos. */
export const createPetSchema = (t: TFunction) =>
  z.object({
    species: z.enum(["dog", "cat"]),
    name: z.string().min(1, t("pets.new.validation.nameRequired")),
    breed: z.string().min(1, t("pets.new.validation.breedRequired")),
    sex: z.enum(["female", "male"]),
    birthDate: z.string().optional(),
    weight: z.string().optional(),
  });

export type PetFormValues = z.infer<ReturnType<typeof createPetSchema>>;
