import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Button, OtpInput } from "@/components/ui";

import { createVerifyEmailSchema, type VerifyEmailValues } from "./schema";

type VerifyEmailFormProps = {
  /** Se llama con el código validado al enviar. */
  onSubmit: (values: VerifyEmailValues) => Promise<void> | void;
};

export function VerifyEmailForm({ onSubmit }: VerifyEmailFormProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createVerifyEmailSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  const submit = handleSubmit(onSubmit);

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <OtpInput
            value={field.value}
            onChangeText={field.onChange}
            error={errors.code?.message}
            autoFocus
            onComplete={() => submit()}
          />
        )}
      />

      <Button
        label={t("verifyEmail.submit")}
        leftIcon="check"
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
