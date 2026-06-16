import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SignInForm, type SignInValues } from "@/features/sign-in";
import { fonts, useTheme } from "@/theme";

const SignIn = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = async (values: SignInValues) => {
    // TODO: llamar al backend (axios) y guardar la sesión con useAuth().signIn(...)
    console.log("sign-in", values);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        {/* Wordmark */}
        <Text style={[styles.wordmark, { color: colors.text }]}>
          TRUFFA<Text style={{ color: colors.accent }}>.</Text>
        </Text>

        <View style={styles.formBlock}>
          <SignInForm
            onSubmit={handleSubmit}
            onForgotPassword={() => router.push("/forgot-password")}
          />
        </View>

        {/* Separador punteado */}
        <View style={[styles.divider, { borderColor: colors.border }]} />

        <Pressable
          style={styles.footer}
          hitSlop={8}
          accessibilityRole="button"
          onPress={() => router.push("/sign-up")}
        >
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            {t("signIn.noAccount")}
          </Text>
          <Text style={[styles.footerText, styles.footerCta, { color: colors.text }]}>
            {t("signIn.createAccount")}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
    gap: 28,
  },
  wordmark: {
    fontFamily: fonts.mono,
    fontSize: 56,
    fontWeight: "800",
    letterSpacing: 4,
  },
  formBlock: {
    marginTop: 8,
  },
  divider: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    columnGap: 6,
  },
  footerText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  footerCta: {
    fontWeight: "700",
  },
});

export default SignIn;
