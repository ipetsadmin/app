import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { Button } from "@/src/components/ui/Button";
import { TextField } from "@/src/components/ui/TextField";
import { ThemedText } from "@/src/components/ui/ThemedText";
import { ThemedView } from "@/src/components/ui/ThemedView";
import { Colors } from "@/src/constants/colors";
import { useTheme } from "@/src/contexts/theme-context";
import { useSignIn } from "@/src/features/auth/use-sign-in";

const { width, height } = Dimensions.get("window");
const DOT_SPACING = 22;
const COLS = Math.ceil(width / DOT_SPACING) + 1;
const ROWS = Math.ceil(height / DOT_SPACING) + 1;

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});

type FormData = z.infer<typeof schema>;

function DotBackground({ color }: { color: string }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: ROWS }).map((_, row) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static grid
        <View key={row} style={styles.dotRow}>
          {Array.from({ length: COLS }).map((_, col) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static grid
            <View key={col} style={[styles.dot, { backgroundColor: color }]} />
          ))}
        </View>
      ))}
    </View>
  );
}

export default function SignIn() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];
  const { mutate: signIn, isPending, error } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => signIn(data);

  const dotColor = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  return (
    <ThemedView style={styles.screen}>
      <DotBackground color={dotColor} />

      <SafeAreaView style={styles.safe}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Ionicons
            name={theme === "dark" ? "sunny-outline" : "moon-outline"}
            size={22}
            color={colors.icon}
          />
        </TouchableOpacity>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ThemedText style={styles.logo}>TRUFFA</ThemedText>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="Correo"
                    index={1}
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
                    index={2}
                    leftIcon="lock-closed-outline"
                    placeholder="••••••••"
                    secureTextEntry
                    autoComplete="password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.password?.message}
                  />
                )}
              />

              {error && (
                <ThemedText style={styles.apiError} lightColor="#E53E3E" darkColor="#FC8181">
                  {error instanceof Error ? error.message : "Error al iniciar sesión"}
                </ThemedText>
              )}

              <Link href="/(auth)/forgot-password" asChild>
                <Pressable style={styles.forgotRow}>
                  <ThemedText
                    style={styles.forgotText}
                    lightColor={colors.inputPlaceholder}
                    darkColor={colors.inputPlaceholder}
                  >
                    ¿OLVIDASTE TU CONTRASEÑA?
                  </ThemedText>
                </Pressable>
              </Link>

              <Button title="Entrar" onPress={handleSubmit(onSubmit)} loading={isPending} />
            </View>

            <View style={styles.footer}>
              <View style={[styles.divider, { borderColor: colors.inputPlaceholder }]} />
              <View style={styles.registerRow}>
                <ThemedText
                  style={styles.registerText}
                  lightColor={colors.inputPlaceholder}
                  darkColor={colors.inputPlaceholder}
                >
                  ¿NO TENÉS CUENTA?{" "}
                </ThemedText>
                <Link href="/(auth)/sign-up" asChild>
                  <Pressable>
                    <ThemedText style={[styles.registerText, styles.registerLink]}>
                      CREAR CUENTA
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
  themeToggle: {
    alignSelf: "flex-end",
    padding: 8,
    paddingRight: 16,
    paddingTop: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 40,
  },
  logo: {
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 8,
    lineHeight: 54,
    paddingRight: 16,
  },
  form: {
    gap: 16,
  },
  apiError: {
    fontSize: 13,
    textAlign: "center",
  },
  forgotRow: {
    alignSelf: "flex-end",
  },
  forgotText: {
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: "600",
  },
  footer: {
    paddingTop: 32,
    paddingBottom: 24,
    gap: 24,
  },
  divider: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    opacity: 0.4,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  registerText: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  registerLink: {
    color: "#6B7A9E",
  },
  dotRow: {
    flexDirection: "row",
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    marginRight: DOT_SPACING - 2,
    marginBottom: DOT_SPACING - 2,
  },
});
