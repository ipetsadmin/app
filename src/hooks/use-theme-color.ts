import { useColorScheme } from "react-native";
import { Colors } from "@/src/constants/colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];
  return colorFromProps ?? Colors[theme][colorName];
}
