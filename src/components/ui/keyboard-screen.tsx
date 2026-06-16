import type { ReactNode } from "react";
import { ScrollView, StyleSheet, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/theme";

type KeyboardScreenProps = {
  children: ReactNode;
  /** Centra el contenido verticalmente (login). Por defecto va arriba. */
  center?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Contenedor de pantalla con fondo del tema, scroll y manejo de teclado.
 *
 * Usa un `ScrollView` directo (sin `KeyboardAvoidingView`) para conservar el
 * comportamiento nativo de las NativeTabs (inset automático + barra translúcida
 * al hacer scroll). El teclado se evita con `automaticallyAdjustKeyboardInsets`
 * en iOS; en Android lo resuelve el `adjustResize` por defecto de Expo.
 */
export function KeyboardScreen({ children, center, contentStyle }: KeyboardScreenProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.flex, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, center && styles.center, contentStyle]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
      contentInsetAdjustmentBehavior="automatic"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 18,
  },
  center: {
    justifyContent: "center",
  },
});
