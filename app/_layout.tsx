import { Stack } from "expo-router";
import "@/src/shared/libs/i18n";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
