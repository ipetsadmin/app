import { Link } from "expo-router";
import { ThemedText } from "@/src/components/ui/ThemedText";
import { ThemedView } from "@/src/components/ui/ThemedView";

export default function SignIn() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Sign In</ThemedText>
      <Link href="/(auth)/sign-up">Go to Sign Up</Link>
      <Link href="/(auth)/forgot-password">Forgot Password</Link>
      <Link href="/(app)/home">Go to App</Link>
    </ThemedView>
  );
}
