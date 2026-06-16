import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/theme";

type CornerPos = "tl" | "tr" | "bl" | "br";

function Corner({ pos, color }: { pos: CornerPos; color: string }) {
  return <View pointerEvents="none" style={[styles.corner, { borderColor: color }, corners[pos]]} />;
}

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Muestra las marcas de esquina (crop-marks). Por defecto false. */
  brackets?: boolean;
};

/** Superficie redondeada con borde sutil (estética terminal). */
export function Card({ children, style, brackets = false }: CardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
      {children}
      {brackets ? (
        <>
          <Corner pos="tl" color={colors.textMuted} />
          <Corner pos="tr" color={colors.textMuted} />
          <Corner pos="bl" color={colors.textMuted} />
          <Corner pos="br" color={colors.textMuted} />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
  },
  corner: {
    position: "absolute",
    width: 12,
    height: 12,
  },
});

const corners: Record<CornerPos, ViewStyle> = {
  tl: { top: 7, left: 7, borderTopWidth: 1.5, borderLeftWidth: 1.5 },
  tr: { top: 7, right: 7, borderTopWidth: 1.5, borderRightWidth: 1.5 },
  bl: { bottom: 7, left: 7, borderBottomWidth: 1.5, borderLeftWidth: 1.5 },
  br: { bottom: 7, right: 7, borderBottomWidth: 1.5, borderRightWidth: 1.5 },
};
