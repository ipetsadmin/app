import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { storageKeys } from "@/constants";
import { storage } from "@/lib/storage";

import { en } from "./translations/en";
import { es } from "./translations/es";

export const defaultNS = "translation";

export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const;

export type AppLanguage = keyof typeof resources;

/** Idioma del dispositivo si está soportado; si no, español. */
const deviceLanguage = getLocales()[0]?.languageCode ?? "es";
const initialLanguage: AppLanguage = deviceLanguage in resources ? (deviceLanguage as AppLanguage) : "es";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "es",
  defaultNS,
  ns: [defaultNS],
  interpolation: { escapeValue: false }, // React ya escapa
  returnNull: false,
});

/** Cambia el idioma activo y lo persiste. */
export async function setAppLanguage(language: AppLanguage) {
  await i18n.changeLanguage(language);
  await storage.Async.save(storageKeys.language, language);
}

/** Aplica el idioma guardado (si existe). Se llama en el bootstrap. */
export async function loadSavedLanguage() {
  const saved = await storage.Async.get<AppLanguage>(storageKeys.language);
  if (saved && saved in resources) await i18n.changeLanguage(saved);
}

export default i18n;
