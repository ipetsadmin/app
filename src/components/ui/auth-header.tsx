import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { fonts, useTheme } from "@/theme";

type AuthHeaderProps = {
  /** Texto pequeño en mayúsculas sobre el título, ej. "RECUPERACIÓN". */
  overline?: string;
  /** Título grande tipo wordmark, ej. "RESTABLECER". */
  title: string;
  /** Si se pasa, muestra el botón circular de volver. */
  onBack?: () => void;
};

/** Encabezado de pantallas de auth: botón atrás opcional + overline + título. */
export function AuthHeader({ overline, title, onBack }: AuthHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          style={({ pressed }) => [
            styles.back,
            { backgroundColor: colors.inputBg, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Feather name="chevron-left" size={26} color={colors.text} />
        </Pressable>
      ) : null}

      <View style={styles.titles}>
        {overline ? (
          <Text style={[styles.overline, { color: colors.label }]}>{overline.toUpperCase()}</Text>
        ) : null}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  back: {
    width: 64,
    height: 64,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titles: {
    flex: 1,
    gap: 4,
  },
  overline: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 2,
  },
  title: {
    fontFamily: fonts.mono,
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 3,
  },
});
