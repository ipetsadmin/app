import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ForgotPassword() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Forgot Password</Text>
      <Link href="/(auth)/sign-in">Back to Sign In</Link>
    </View>
  );
}
