import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Button, Input } from "@/components/ui";

import { createForgotPasswordSchema, type ForgotPasswordValues } from "./schema";

type ForgotPasswordFormProps = {
  /** Se llama con el email validado al enviar. */
  onSubmit: (values: ForgotPasswordValues) => Promise<void> | void;
};

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createForgotPasswordSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
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
            returnKeyType="go"
            onSubmitEditing={() => submit()}
          />
        )}
      />

      <Button
        label={t("forgotPassword.submit")}
        leftIcon="arrow-right"
        loading={isSubmitting}
        onPress={() => submit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
});
