import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Button, Input } from "@/components/ui";

import { createRegisterSchema, type RegisterValues } from "./schema";

type RegisterFormProps = {
  /** Se llama con los valores validados al enviar. */
  onSubmit: (values: RegisterValues) => Promise<void> | void;
};

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createRegisterSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const submit = handleSubmit(onSubmit);

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <Input
            label={t("fields.firstName.label")}
            indexLabel="01"
            leftIcon="user"
            placeholder={t("fields.firstName.placeholder")}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.firstName?.message}
            autoCapitalize="words"
            autoComplete="given-name"
            returnKeyType="next"
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <Input
            label={t("fields.lastName.label")}
            indexLabel="02"
            leftIcon="user"
            placeholder={t("fields.lastName.placeholder")}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.lastName?.message}
            autoCapitalize="words"
            autoComplete="family-name"
            returnKeyType="next"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            label={t("fields.email.label")}
            indexLabel="03"
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
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            label={t("fields.password.label")}
            indexLabel="04"
            leftIcon="lock"
            placeholder={t("fields.password.placeholder")}
            password
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.password?.message}
            autoCapitalize="none"
            autoComplete="new-password"
            returnKeyType="go"
            onSubmitEditing={() => submit()}
          />
        )}
      />

      <Button
        label={t("register.submit")}
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
});
