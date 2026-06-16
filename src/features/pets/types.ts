import { Feather } from "@expo/vector-icons";

export type PetSpecies = "dog" | "cat";
export type PetSex = "female" | "male";

export type PetEvent = {
  icon: keyof typeof Feather.glyphMap;
  /** Texto del evento (dato, no se traduce). */
  label: string;
  /** Fecha legible del evento (dato). */
  date: string;
};

export type Pet = {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  sex: PetSex;
  ageYears: number;
  ageMonths: number;
  /** Fecha de nacimiento (dd/mm/yyyy). */
  birthDate?: string;
  weightKg?: number;
  nextEvent?: PetEvent;
};
