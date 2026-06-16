import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Button, Input } from "@/components/ui";
import { fonts, useTheme } from "@/theme";

import { createSignInSchema, type SignInValues } from "./schema";

type SignInFormProps = {
  /** Se llama con los valores ya validados al enviar. */
  onSubmit: (values: SignInValues) => Promise<void> | void;
  /** Navegar a recuperar contraseña. */
  onForgotPassword?: () => void;
};

export function SignInForm({ onSubmit, onForgotPassword }: SignInFormProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const schema = useMemo(() => createSignInSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const submit = handleSubmit(onSubmit);

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            label={t("fields.email.label")}
            indexLabel="01"
            leftIcon="mail"
            placeholder={t("fields.email.placeholder")}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            returnKeyType="next"
            submitBehavior="submit"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            label={t("fields.password.label")}
            indexLabel="02"
            leftIcon="lock"
            placeholder={t("fields.password.placeholder")}
            password
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.password?.message}
            autoCapitalize="none"
            autoComplete="current-password"
            returnKeyType="go"
            onSubmitEditing={() => submit()}
          />
        )}
      />

      <Pressable
        onPress={onForgotPassword}
        hitSlop={8}
        style={styles.forgot}
        accessibilityRole="button"
      >
        <Text style={[styles.forgotText, { color: colors.textMuted }]}>{t("signIn.forgot")}</Text>
      </Pressable>

      <Button
        label={t("signIn.submit")}
        leftIcon="arrow-right"
        loading={isSubmitting}
        onPress={() => submit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 22,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: -4,
  },
  forgotText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
