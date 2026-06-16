import { dummyPets } from "@/constants";

/** Lista de mascotas (datos dummy desde `@/constants`). */
export const pets = dummyPets;

export const getPetById = (id?: string) => pets.find((p) => p.id === id);
