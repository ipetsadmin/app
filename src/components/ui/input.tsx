import { Feather } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { fonts, useTheme } from "@/theme";

export type InputProps = TextInputProps & {
  /** Etiqueta superior (se muestra en mayúsculas). */
  label?: string;
  /** Índice mostrado a la derecha de la etiqueta, ej. "01". */
  indexLabel?: string;
  /** Icono de Feather a la izquierda del campo. */
  leftIcon?: keyof typeof Feather.glyphMap;
  /** Mensaje de error mostrado debajo del campo. */
  error?: string;
  /** Campo de contraseña: oculta el texto y muestra el toggle de ojo. */
  password?: boolean;
  /** Texto fijo a la derecha del campo, ej. "KG". */
  rightText?: string;
};

/**
 * Campo de texto con estética monospace/terminal, personalizado vía `useTheme`.
 */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, indexLabel, leftIcon, error, password, rightText, style, ...props },
  ref,
) {
  const { colors } = useTheme();
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrapper}>
      {(label || indexLabel) && (
        <View style={styles.labelRow}>
          {label ? (
            <Text style={[styles.label, { color: colors.label }]}>{label.toUpperCase()}</Text>
          ) : (
            <View />
          )}
          {indexLabel ? (
            <Text style={[styles.index, { color: colors.label }]}>{indexLabel}</Text>
          ) : null}
        </View>
      )}

      <View
        style={[
          styles.field,
          { backgroundColor: colors.inputBg, borderColor: error ? colors.danger : colors.border },
        ]}
      >
        {leftIcon ? (
          <Feather name={leftIcon} size={20} color={colors.textMuted} style={styles.leftIcon} />
        ) : null}

        <TextInput
          ref={ref}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={password ? hidden : props.secureTextEntry}
          style={[styles.input, { color: colors.text }, style]}
          {...props}
        />

        {password ? (
          <Pressable
            onPress={() => setHidden((v) => !v)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Mostrar contraseña" : "Ocultar contraseña"}
          >
            <Feather name={hidden ? "eye" : "eye-off"} size={20} color={colors.textMuted} />
          </Pressable>
        ) : null}

        {rightText ? (
          <Text style={[styles.rightText, { color: colors.textMuted }]}>{rightText}</Text>
        ) : null}
      </View>

      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 2,
  },
  index: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 1,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  leftIcon: {
    marginRight: 2,
  },
  input: {
    flex: 1,
    fontFamily: fonts.mono,
    fontSize: 17,
    height: "100%",
  },
  rightText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    letterSpacing: 1,
  },
  error: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    paddingHorizontal: 2,
  },
});
