import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";
import ToolCard from "../components/ToolCard";
import useTheme from "../hooks/useTheme";

export default function Home() {
  const router = useRouter();
  const COLORS = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        {/* ✅ HEADER */}
        <AppHeader title="Smart Toolkit" />

        {/* ✅ CONTENT */}
        <View style={styles.content}>
          <ToolCard
            title="Unit Converter"
            subtitle="Convert length, weight, temperature and currency"
            onPress={() => router.push("/converter")}
          />

          <ToolCard
            title="Notes"
            subtitle="Save and manage your notes"
            onPress={() => router.push("/notes")}
          />

          <ToolCard
            title="To-Do List"
            subtitle="Organize your tasks and stay productive"
            onPress={() => router.push("/todo")}
          />

          <ToolCard
            title="Calculator"
            subtitle="Perform quick calculations"
            onPress={() => router.push("/calculator")}
          />

          <ToolCard
            title="BMI Calculator"
            subtitle="Check your body mass index"
            onPress={() => router.push("/bmi")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginTop: 20,
  },
});
