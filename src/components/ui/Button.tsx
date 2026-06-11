import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from "react-native";
import { ButtonColors } from "@/src/constants/colors";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  icon?: IoniconName;
};

export function Button({ title, loading, disabled, icon = "arrow-forward", style, ...rest }: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isDisabled ? ButtonColors.primaryDisabled : ButtonColors.primary },
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={ButtonColors.primaryText} />
      ) : (
        <View style={styles.content}>
          <Ionicons name={icon} size={18} color={ButtonColors.primaryText} style={styles.icon} />
          <Text style={styles.text}>{title.toUpperCase()}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    marginTop: 1,
  },
  text: {
    color: ButtonColors.primaryText,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2,
  },
});
