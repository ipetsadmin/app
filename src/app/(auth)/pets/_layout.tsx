import { Stack } from "expo-router";

import { useTheme } from "@/theme";

const PetsLayout = () => {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerTitle: "",
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="new" />
    </Stack>
  );
};

export default PetsLayout;
