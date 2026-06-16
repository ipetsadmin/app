import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import "@/lib/i18n";
import { AppProviders } from "@/providers";

const RootStack = () => {

  const isAuthenticated = false;

  const { top } = useSafeAreaInsets();

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { paddingTop: top, backgroundColor: "white" } }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AppProviders>
      <RootStack />
    </AppProviders>
  );
}
