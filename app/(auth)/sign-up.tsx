import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { Button } from "@/src/components/ui/Button";
import { DotBackground } from "@/src/components/ui/DotBackground";
import { TextField } from "@/src/components/ui/TextField";
import { ThemedText } from "@/src/components/ui/ThemedText";
import { ThemedView } from "@/src/components/ui/ThemedView";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { Colors } from "@/src/constants/colors";
import { useTheme } from "@/src/contexts/theme-context";
import { useSignUp } from "@/src/features/auth/use-sign-up";

const schema = z.object({
  firstName: z.string().min(1, "Ingresá tu nombre"),
  lastName: z.string().min(1, "Ingresá tu apellido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { mutate: signUp, isPending, error } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => signUp(data);

  return (
    <ThemedView style={styles.screen}>
      <DotBackground />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Top bar */}
            <View style={styles.topBar}>
              <ThemeToggle />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={[styles.backButton, { backgroundColor: colors.inputBackground }]}
                onPress={() => router.back()}
              >
                <Ionicons name="chevron-back" size={22} color={colors.text} />
              </TouchableOpacity>

              <View style={styles.titleBlock}>
                <ThemedText
                  style={styles.subtitle}
                  lightColor={colors.inputPlaceholder}
                  darkColor={colors.inputPlaceholder}
                >
                  PASO 01 / 01
                </ThemedText>
                <ThemedText style={styles.title}>CREAR CUENTA</ThemedText>
              </View>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Nombre"
                    index={1}
                    leftIcon="person-outline"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.firstName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Apellido"
                    index={2}
                    leftIcon="person-outline"
                    placeholder="Tu apellido"
                    autoComplete="family-name"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.lastName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Correo"
                    index={3}
                    leftIcon="mail-outline"
                    placeholder="vos@correo.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Contraseña"
                    index={4}
                    leftIcon="lock-closed-outline"
                    placeholder="••••••••"
                    secureTextEntry
                    autoComplete="new-password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.password?.message}
                  />
                )}
              />

              {error && (
                <ThemedText style={styles.apiError} lightColor="#E53E3E" darkColor="#FC8181">
                  {error instanceof Error ? error.message : "Error al crear la cuenta"}
                </ThemedText>
              )}

              <Button
                title="Crear cuenta"
                icon="checkmark"
                onPress={handleSubmit(onSubmit)}
                loading={isPending}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={[styles.divider, { borderColor: colors.inputPlaceholder }]} />
              <View style={styles.loginRow}>
                <ThemedText
                  style={styles.footerText}
                  lightColor={colors.inputPlaceholder}
                  darkColor={colors.inputPlaceholder}
                >
                  ¿YA TENÉS CUENTA?{" "}
                </ThemedText>
                <Link href="/(auth)/sign-in" asChild>
                  <Pressable>
                    <ThemedText style={[styles.footerText, styles.footerLink]}>
                      INICIAR SESIÓN
                    </ThemedText>
                  </Pressable>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: { flex: 1 },
  flex: { flex: 1 },
  topBar: {
    alignSelf: "flex-end",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  backButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBlock: {
    gap: 4,
    flex: 1,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 4,
    lineHeight: 36,
    paddingRight: 8,
  },
  form: {
    gap: 16,
  },
  apiError: {
    fontSize: 13,
    textAlign: "center",
  },
  footer: {
    gap: 24,
  },
  divider: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    opacity: 0.4,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footerText: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  footerLink: {
    color: "#6B7A9E",
  },
});
