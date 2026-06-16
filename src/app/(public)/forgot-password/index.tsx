import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";

import { AuthHeader, KeyboardScreen } from "@/components/ui";
import { ForgotPasswordForm, type ForgotPasswordValues } from "@/features/forgot-password";
import { useTheme } from "@/theme";

const ForgotPassword = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = async (values: ForgotPasswordValues) => {
    // TODO: llamar al backend (axios) para enviar el enlace de recuperación.
    console.log("forgot-password", values);
  };

  return (
    <KeyboardScreen center>
      <AuthHeader overline={t("forgotPassword.overline")} title={t("forgotPassword.title")} />

      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {t("forgotPassword.subtitle")}
      </Text>

      <ForgotPasswordForm onSubmit={handleSubmit} />
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

export default ForgotPassword;
