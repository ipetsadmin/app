import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@/src/contexts/theme-context";
import { Colors } from "@/src/constants/colors";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ padding: 8, marginRight: 8 }}>
      <Ionicons
        name={theme === "dark" ? "sunny-outline" : "moon-outline"}
        size={22}
        color={Colors[theme].icon}
      />
    </TouchableOpacity>
  );
}
