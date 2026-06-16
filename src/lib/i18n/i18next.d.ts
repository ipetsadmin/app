import "i18next";

import type { es } from "./translations/es";

/** Tipa las keys de `t()` y `useTranslation()` a partir de las traducciones `es`. */
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof es;
    };
  }
}
