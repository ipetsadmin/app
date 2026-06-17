import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import { AuthHeader, KeyboardScreen } from "@/components/ui";
import { RegisterForm, type RegisterValues } from "@/features/register";
import { useAuth } from "@/providers";

const SignUp = () => {
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
    <KeyboardScreen center>
      <AuthHeader overline={t("register.overline")} title={t("register.title")} />

      <RegisterForm onSubmit={handleSubmit} />
    </KeyboardScreen>
  );
};

export default SignUp;
