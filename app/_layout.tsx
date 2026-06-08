import { AuthProvider } from "@/src/providers/auth-provider";
import { Stack } from "expo-router";
import "@/src/libs/i18n";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
