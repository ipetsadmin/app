import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";

import { fonts, useTheme } from "@/theme";

/**
 * Splash en JS (sobre el splash nativo): muestra el wordmark TRUFFA + la patita
 * con los colores del tema y hace fade-out para revelar la app. Provisional.
 */
export function AppSplash() {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(1)).current;
  const [done, setDone] = useState(false);

  useEffect(() => {
    const anim = Animated.timing(opacity, {
      toValue: 0,
      duration: 450,
      delay: 600,
      useNativeDriver: true,
    });
    anim.start(({ finished }) => {
      if (finished) setDone(true);
    });
    return () => anim.stop();
  }, [opacity]);

  if (done) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.container, { backgroundColor: colors.background, opacity }]}
    >
      <Ionicons name="paw" size={72} color={colors.accent} />
      <Text style={[styles.wordmark, { color: colors.text }]}>
        TRUFFA<Text style={{ color: colors.accent }}>.</Text>
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    zIndex: 10,
  },
  wordmark: {
    fontFamily: fonts.mono,
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: 4,
  },
});
