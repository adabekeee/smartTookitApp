import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../hooks/useTheme";
import { useAppTheme } from "@/context/ThemeContext";
import { Fonts } from "../constants/theme";

type Props = {
  title: string;
  leftIcon?: any;
  onLeftPress?: () => void;
};

export default function AppHeader({ title, leftIcon, onLeftPress }: Props) {
  const COLORS = useTheme();
  const { theme, toggleTheme } = useAppTheme();

  return (
    <View style={styles.container}>
      
      {/* LEFT ICON */}
      <TouchableOpacity onPress={onLeftPress}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={24}
            color={COLORS.textPrimary}
          />
        )}
      </TouchableOpacity>

      {/* TITLE */}
      <Text
        style={[
          styles.title,
          { color: COLORS.textPrimary, fontFamily: Fonts.bold },
        ]}
      >
        {title}
      </Text>

      {/* THEME TOGGLE */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          styles.themeBtn,
          { backgroundColor: COLORS.card },
        ]}
      >
        <Ionicons
          name={theme === "light" ? "moon" : "sunny"}
          size={20}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
  },
  themeBtn: {
    padding: 6,
    borderRadius: 20,
  },
});