import { Stack } from "expo-router";

import { ThemeProvider } from "@/theme";

const PublicLayout = () => {
  return (
    <ThemeProvider forced="dark">
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
};

export default PublicLayout;
