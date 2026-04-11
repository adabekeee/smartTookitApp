import {Text, TouchableOpacity, StyleSheet } from "react-native";
import useTheme from "../hooks/useTheme";
import { Fonts } from "../constants/theme";

type Props = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export default function ToolCard({ title, subtitle, onPress }: Props) {
  const COLORS = useTheme();

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: COLORS.card }]} onPress={onPress}>
      <Text style={[styles.title, { color: COLORS.textPrimary, fontFamily: Fonts.medium }]}>
        {title}
      </Text>

      <Text style={[styles.subtitle, { color: COLORS.textSecondary, fontFamily: Fonts.regular }]}>
        {subtitle}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});