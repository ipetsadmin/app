import { Stack } from "expo-router";

import { useTheme } from "@/theme";

const PublicLayout = () => {
  const { colors } = useTheme();

  const backHeaderOptions = {
    headerShown: true,
    headerTitle: "",
    headerStyle: { backgroundColor: colors.background },
    headerShadowVisible: false,
    headerTintColor: colors.text,
    headerBackButtonDisplayMode: "minimal" as const,
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up" options={backHeaderOptions} />
      <Stack.Screen name="forgot-password" options={backHeaderOptions} />
      <Stack.Screen name="verify-email" options={backHeaderOptions} />
    </Stack>
  );
};

export default PublicLayout;
