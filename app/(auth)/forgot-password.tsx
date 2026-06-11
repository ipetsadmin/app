import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
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

const schema = z.object({
  email: z.string().email("Correo inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (_data: FormData) => {
    // TODO: conectar con endpoint de recuperación
  };

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
                  RECUPERACIÓN
                </ThemedText>
                <ThemedText style={styles.title}>RESTABLECER</ThemedText>
              </View>
            </View>

            {/* Form */}
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

              <Button title="Enviar enlace" onPress={handleSubmit(onSubmit)} />
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 48,
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
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 4,
    lineHeight: 38,
    paddingRight: 8,
  },
  topBar: {
    alignSelf: "flex-end",
  },
  form: {
    gap: 16,
  },
});
