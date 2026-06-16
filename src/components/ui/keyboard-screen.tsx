import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

type KeyboardScreenProps = {
  children: ReactNode;
  /** Centra el contenido verticalmente (login). Por defecto va arriba. */
  center?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Contenedor de pantalla con fondo del tema, scroll y manejo de teclado.
 * Compartido por las pantallas de auth para un comportamiento consistente.
 */
export function KeyboardScreen({ children, center, contentStyle }: KeyboardScreenProps) {
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.content, center && styles.center, contentStyle]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingVertical: 40,
    gap: 28,
  },
  center: {
    justifyContent: "center",
  },
});
