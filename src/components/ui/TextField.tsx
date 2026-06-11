import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, type TextInputProps, TouchableOpacity, View } from "react-native";
import { Colors } from "@/src/constants/colors";
import { useTheme } from "@/src/contexts/theme-context";
import { ThemedText } from "./ThemedText";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export type TextFieldProps = TextInputProps & {
  label?: string;
  index?: number;
  leftIcon?: IoniconName;
  error?: string;
};

export function TextField({
  label,
  index,
  leftIcon,
  secureTextEntry,
  error,
  style,
  ...rest
}: TextFieldProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  const hasLabel = label != null || index != null;

  return (
    <View style={styles.wrapper}>
      {hasLabel && (
        <View style={styles.labelRow}>
          {label && (
            <ThemedText
              style={styles.label}
              lightColor={colors.inputPlaceholder}
              darkColor={colors.inputPlaceholder}
            >
              {label.toUpperCase()}
            </ThemedText>
          )}
          {index != null && (
            <ThemedText
              style={styles.label}
              lightColor={colors.inputPlaceholder}
              darkColor={colors.inputPlaceholder}
            >
              {String(index).padStart(2, "0")}
            </ThemedText>
          )}
        </View>
      )}

      <View style={[styles.container, { backgroundColor: colors.inputBackground }]}>
        {leftIcon && (
          <Ionicons name={leftIcon} size={20} color={colors.inputIcon} style={styles.leftIcon} />
        )}

        <TextInput
          style={[styles.input, { color: colors.inputText }, style]}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={hidden}
          autoCapitalize="none"
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden((h) => !h)} style={styles.rightIcon}>
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={colors.inputIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <ThemedText style={styles.error} lightColor="#E53E3E" darkColor="#FC8181">
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  rightIcon: {
    marginLeft: 12,
    padding: 4,
  },
  error: {
    fontSize: 12,
    paddingHorizontal: 4,
  },
});
