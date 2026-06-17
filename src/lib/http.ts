import { createApiClient, HttpClient } from "@ipetsadmin/api-client";
import type { IApiResponse } from "@ipetsadmin/contracts";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
}) as HttpClient;

export const api = createApiClient({ http });

/**
 * Desempaqueta el envelope `IApiResponse<T>` que devuelven los métodos de `api`.
 * Si la respuesta no fue exitosa lanza un Error (con `error`/`message` del backend)
 * para que React Query lo capture; en caso contrario retorna el `data` tipado.
 */
export function unwrap<T>(res: IApiResponse<T>): T {
  if (!res.success || res.data === undefined) {
    throw new Error(res.error ?? res.message ?? "La solicitud falló");
  }
  return res.data;
}
