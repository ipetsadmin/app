import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign In</Text>
      <Link href="/(auth)/sign-up">Go to Sign Up</Link>
      <Link href="/(auth)/forgot-password">Forgot Password</Link>
      <Link href="/(app)/home">Go to App</Link>
    </View>
  );
}
