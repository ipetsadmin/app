import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import es from "./locales/es";

const lng = getLocales()?.[0].languageCode ?? "en";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n.use(initReactI18next).init({
  resources,
  lng,
  supportedLngs: ["en", "es"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
