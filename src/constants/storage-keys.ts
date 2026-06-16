/**
 * Claves usadas con `@/lib/storage` (Async / Secure).
 * Centralizadas para evitar strings mágicos duplicados.
 */
export const storageKeys = {
  /** Sesión de auth (token + user) — Secure. */
  authSession: "auth-session",
  /** Preferencia de tema forzada por el usuario — Async. */
  themePreference: "theme-preference",
  /** Idioma elegido por el usuario (es/en) — Async. */
  language: "language",
  /** Flag de onboarding visto — Async. */
  onboardingSeen: "onboarding-seen",
} as const;

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys];
