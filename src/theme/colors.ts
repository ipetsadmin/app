export type ColorScheme = "light" | "dark";

/** Paleta por esquema. `dark` define la identidad de marca (pantallas de auth). */
export const palettes = {
  light: {
    background: "#FFFFFF",
    surface: "#F4F5F7",
    inputBg: "#F4F5F7",
    text: "#11181C",
    textMuted: "#687076",
    label: "#8A9099",
    border: "#E2E4E7",
    placeholder: "#9BA1A6",
    accent: "#5B61A8",
    accentText: "#FFFFFF",
    primary: "#5B61A8",
    danger: "#D7263D",
  },
  dark: {
    background: "#0E1217",
    surface: "#161B22",
    inputBg: "#161B22",
    text: "#E6E8EC",
    textMuted: "#8A9099",
    label: "#6B7480",
    border: "#272E37",
    placeholder: "#555D67",
    accent: "#AEB3D6",
    accentText: "#161A22",
    primary: "#AEB3D6",
    danger: "#FF6B7D",
  },
} as const;

export type ThemeColors = (typeof palettes)[ColorScheme];
