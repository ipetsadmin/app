import { Platform } from "react-native";

/** Fuentes de la app. La estética monospace/terminal usa `mono`. */
export const fonts = {
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }) as string,
};
