import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants";
import { api, unwrap } from "@/lib/http";

import { useAuthed } from "../shared";

/**
 * Mascotas de un usuario (`GET /api/v1/users/{userId}/pets`).
 * Si no se pasa `userId`, usa el del usuario autenticado.
 */
export function usePets(userId?: string) {
  const { accessToken, userId: currentUserId } = useAuthed();
  const id = userId ?? currentUserId;
  return useQuery({
    queryKey: queryKeys.pets.list({ userId: id }),
    queryFn: () => api.users.getPets(accessToken!, id!).then(unwrap),
    enabled: !!accessToken && !!id,
  });
}

/** Detalle de una mascota (`GET /api/v1/pets/{petId}`). */
export function usePet(petId: string) {
  const { accessToken } = useAuthed();
  return useQuery({
    queryKey: queryKeys.pets.detail(petId),
    queryFn: () => api.pets.getById(accessToken!, petId).then(unwrap),
    enabled: !!accessToken && !!petId,
  });
}

/** Tratamientos de una mascota (`GET /api/v1/pets/{petId}/treatments`). */
export function useTreatments(petId: string) {
  const { accessToken } = useAuthed();
  return useQuery({
    queryKey: queryKeys.treatments.all(petId),
    queryFn: () => api.pets.getTreatments(accessToken!, petId).then(unwrap),
    enabled: !!accessToken && !!petId,
  });
}

/** Detalle de un tratamiento (`GET /api/v1/pets/{petId}/treatments/{treatmentId}`). */
export function useTreatment(petId: string, treatmentId: string) {
  const { accessToken } = useAuthed();
  return useQuery({
    queryKey: queryKeys.treatments.detail(petId, treatmentId),
    queryFn: () => api.pets.getTreatment(accessToken!, petId, treatmentId).then(unwrap),
    enabled: !!accessToken && !!petId && !!treatmentId,
  });
}
