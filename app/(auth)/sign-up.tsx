import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SignUp() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign Up</Text>
      <Link href="/(auth)/sign-in">Go to Sign In</Link>
    </View>
  );
}
