import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { fonts, useTheme } from "@/theme";

type OtpInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  /** Cantidad de dígitos. Por defecto 6. */
  length?: number;
  /** Mensaje de error mostrado debajo de las celdas. */
  error?: string;
  autoFocus?: boolean;
  /** Se llama al completarse todos los dígitos. */
  onComplete?: (value: string) => void;
};

/**
 * Campo OTP de N celdas. Renderiza celdas visuales sobre un único `TextInput`
 * oculto que captura el texto y habilita el autocompletado nativo del código
 * (iOS `textContentType="oneTimeCode"`, Android `autoComplete="sms-otp"`).
 */
export function OtpInput({
  value,
  onChangeText,
  length = 6,
  error,
  autoFocus,
  onComplete,
}: OtpInputProps) {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "").slice(0, length);
    onChangeText(digits);
    if (digits.length === length) onComplete?.(digits);
  };

  const activeIndex = Math.min(value.length, length - 1);

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.row} onPress={() => inputRef.current?.focus()}>
        {Array.from({ length }, (_, i) => {
          const char = value[i] ?? "";
          const isActive = focused && i === activeIndex && value.length < length;
          return (
            <View
              key={i}
              style={[
                styles.cell,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: error
                    ? colors.danger
                    : isActive
                      ? colors.accent
                      : colors.border,
                },
              ]}
            >
              <Text style={[styles.cellText, { color: colors.text }]}>{char}</Text>
            </View>
          );
        })}

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="number-pad"
          inputMode="numeric"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          maxLength={length}
          autoFocus={autoFocus}
          caretHidden
          style={styles.hiddenInput}
          accessibilityLabel="Código de verificación"
        />
      </Pressable>

      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  cell: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontFamily: fonts.mono,
    fontSize: 22,
    fontWeight: "700",
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  error: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    paddingHorizontal: 2,
  },
});
