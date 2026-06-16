import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";

import { AuthHeader, KeyboardScreen } from "@/components/ui";
import { RegisterForm, type RegisterValues } from "@/features/register";
import { useTheme } from "@/theme";

const SignUp = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = async (values: RegisterValues) => {
    // TODO: llamar al backend (axios) y guardar la sesión con useAuth().signIn(...)
    console.log("register", values);
  };

  return (
    <KeyboardScreen>
      <AuthHeader overline={t("register.overline")} title={t("register.title")} />

      <Text style={[styles.subtitle, { color: colors.textMuted }]}>{t("register.subtitle")}</Text>

      <RegisterForm onSubmit={handleSubmit} />
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

export default SignUp;
