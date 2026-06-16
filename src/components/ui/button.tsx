import { Feather } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from "react-native";

import { fonts, useTheme } from "@/theme";

export type ButtonVariant = "primary" | "outline";

export type ButtonProps = Omit<PressableProps, "style"> & {
  label: string;
  /** Icono de Feather mostrado antes del texto. */
  leftIcon?: keyof typeof Feather.glyphMap;
  /** Muestra un spinner y deshabilita el botón. */
  loading?: boolean;
  /** Estilo visual. `primary` (relleno) por defecto, `outline` (borde). */
  variant?: ButtonVariant;
};

/**
 * Botón con estética monospace/terminal, personalizado vía `useTheme`.
 */
export function Button({
  label,
  leftIcon,
  loading,
  disabled,
  variant = "primary",
  ...props
}: ButtonProps) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;
  const isOutline = variant === "outline";
  const fg = isOutline ? colors.text : colors.accentText;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        isOutline
          ? { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border }
          : { backgroundColor: colors.accent },
        { opacity: isDisabled ? 0.6 : pressed ? 0.9 : 1 },
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <Feather name={leftIcon} size={18} color={fg} /> : null}
          <Text style={[styles.label, { color: fg }]}>{label.toUpperCase()}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: "600",
  },
});
