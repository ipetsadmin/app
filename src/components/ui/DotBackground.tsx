import { Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "@/src/contexts/theme-context";

const { width, height } = Dimensions.get("window");
const DOT_SPACING = 22;
const COLS = Math.ceil(width / DOT_SPACING) + 1;
const ROWS = Math.ceil(height / DOT_SPACING) + 1;

export function DotBackground() {
  const { theme } = useTheme();
  const color =
    theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: ROWS }).map((_, row) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static grid
        <View key={row} style={styles.row}>
          {Array.from({ length: COLS }).map((_, col) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static grid
            <View key={col} style={[styles.dot, { backgroundColor: color }]} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    marginRight: DOT_SPACING - 2,
    marginBottom: DOT_SPACING - 2,
  },
});
