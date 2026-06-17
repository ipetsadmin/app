import type {
  PatchPetTreatmentStatusBody,
  PostPetTreatmentRequestBody,
  PostUserPetRequestBody,
  PutPetDetailsBody,
} from "@ipetsadmin/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mutationKeys, queryKeys } from "@/constants";
import { api, unwrap } from "@/lib/http";

import { useAuthed } from "../shared";

/** Crea una mascota para el usuario (`POST /api/v1/users/{userId}/pets`). */
export function useCreatePet(userId?: string) {
  const { accessToken, userId: currentUserId } = useAuthed();
  const id = userId ?? currentUserId;
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.pets.create,
    mutationFn: (body: PostUserPetRequestBody) => {
      if (!accessToken || !id) throw new Error("No autenticado");
      return api.users.createPet(accessToken, id, body).then(unwrap);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pets.all }),
  });
}

/** Actualiza una mascota (`PUT /api/v1/pets/{petId}`). Body parcial. */
export function useUpdatePet(petId: string) {
  const { accessToken } = useAuthed();
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.pets.update(petId),
    mutationFn: (body: PutPetDetailsBody) => {
      if (!accessToken) throw new Error("No autenticado");
      return api.pets.update(accessToken, petId, body).then(unwrap);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pets.detail(petId) });
      qc.invalidateQueries({ queryKey: queryKeys.pets.all });
    },
  });
}

/** Crea un tratamiento (`POST /api/v1/pets/{petId}/treatments`). */
export function useCreateTreatment(petId: string) {
  const { accessToken } = useAuthed();
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.treatments.create(petId),
    mutationFn: (body: PostPetTreatmentRequestBody) => {
      if (!accessToken) throw new Error("No autenticado");
      return api.pets.createTreatment(accessToken, petId, body).then(unwrap);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.treatments.all(petId) }),
  });
}

/** Cambia el estado de un tratamiento (`PATCH /api/v1/pets/{petId}/treatments/{treatmentId}/status`). */
export function usePatchTreatmentStatus(petId: string, treatmentId: string) {
  const { accessToken } = useAuthed();
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutationKeys.treatments.patchStatus(petId, treatmentId),
    mutationFn: (body: PatchPetTreatmentStatusBody) => {
      if (!accessToken) throw new Error("No autenticado");
      return api.pets.patchTreatmentStatus(accessToken, petId, treatmentId, body).then(unwrap);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.treatments.detail(petId, treatmentId) });
      qc.invalidateQueries({ queryKey: queryKeys.treatments.all(petId) });
    },
  });
}
