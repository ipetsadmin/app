import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text } from "react-native";

import { AuthHeader, KeyboardScreen } from "@/components/ui";
import { RegisterForm, type RegisterValues } from "@/features/register";
import { useAuth } from "@/providers";
import { useTheme } from "@/theme";

const SignUp = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { register } = useAuth();

  const handleSubmit = async (values: RegisterValues) => {
    // El endpoint de registro solo recibe email/contraseña; firstName/lastName
    // se guardarán luego vía perfil (useUpdateProfile). register() devuelve sesión,
    // así que el guard de _layout redirige a (auth) al completarse.
    try {
      await register(values.email, values.password);
    } catch (e) {
      Alert.alert(t("errors.title"), e instanceof Error ? e.message : t("errors.generic"));
    }
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
