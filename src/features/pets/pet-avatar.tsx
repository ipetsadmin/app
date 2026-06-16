import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { fonts, useTheme } from "@/theme";

import type { PetSpecies } from "./types";

type PetAvatarProps = {
  name: string;
  species: PetSpecies;
  size?: number;
};

/** Avatar cuadrado redondeado con la inicial y un badge de especie. */
export function PetAvatar({ name, size = 64 }: PetAvatarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.box,
        { width: size, height: size, borderRadius: size * 0.28, backgroundColor: colors.inputBg, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.initial, { color: colors.textMuted, fontSize: size * 0.34 }]}>
        {name.charAt(0).toUpperCase()}
      </Text>
      <View style={[styles.badge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="paw" size={11} color={colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    fontFamily: fonts.mono,
    fontWeight: "700",
  },
  badge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
