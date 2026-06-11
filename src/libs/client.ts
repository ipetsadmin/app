import { createApiClient, HttpClient } from "@ipetsadmin/api-client";
import axios from "axios";
import env from "../config/env";

const http = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
}) as unknown as HttpClient;

export const api = createApiClient({ http });
