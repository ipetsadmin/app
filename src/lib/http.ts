import { createApiClient, HttpClient } from "@ipetsadmin/api-client";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
}) as HttpClient;

export const api = createApiClient({ http });
