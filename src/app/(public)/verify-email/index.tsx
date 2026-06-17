import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text } from "react-native";

import { AuthHeader, KeyboardScreen } from "@/components/ui";
import { useVerifyEmail } from "@/entities";
import { VerifyEmailForm, type VerifyEmailValues } from "@/features/verify-email";
import { useTheme } from "@/theme";

const VerifyEmail = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const verifyEmail = useVerifyEmail();

  const handleSubmit = async (values: VerifyEmailValues) => {
    try {
      await verifyEmail.mutateAsync({ token: values.code });
      router.back();
    } catch (e) {
      Alert.alert(t("errors.title"), e instanceof Error ? e.message : t("errors.generic"));
    }
  };

  return (
    <KeyboardScreen center>
      <AuthHeader overline={t("verifyEmail.overline")} title={t("verifyEmail.title")} />

      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {t("verifyEmail.subtitle")}
      </Text>

      <VerifyEmailForm onSubmit={handleSubmit} />
    </KeyboardScreen>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: -6,
  },
});

export default VerifyEmail;
