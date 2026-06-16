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

export type ButtonProps = Omit<PressableProps, "style"> & {
  label: string;
  /** Icono de Feather mostrado antes del texto. */
  leftIcon?: keyof typeof Feather.glyphMap;
  /** Muestra un spinner y deshabilita el botón. */
  loading?: boolean;
};

/**
 * Botón principal con estética monospace/terminal, personalizado vía `useTheme`.
 */
export function Button({ label, leftIcon, loading, disabled, ...props }: ButtonProps) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.accent, opacity: isDisabled ? 0.6 : pressed ? 0.9 : 1 },
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.accentText} />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <Feather name={leftIcon} size={20} color={colors.accentText} /> : null}
          <Text style={[styles.label, { color: colors.accentText }]}>{label.toUpperCase()}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 15,
    letterSpacing: 2,
    fontWeight: "600",
  },
});
