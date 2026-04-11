import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../hooks/useTheme";
import AppHeader from "@/components/AppHeader";
import { Fonts } from "@/constants/theme";

export default function BMI() {
  const COLORS = useTheme();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("");

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) {
      setResult("Enter valid values");
      return;
    }

    const bmi = w / (h * h);
    setResult(bmi.toFixed(2));
  };

  const getStatus = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      
      <AppHeader title="BMI Calculator" />

      {/* INPUTS */}
      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        
        <Text style={[styles.label, { color: COLORS.textPrimary }]}>
          Weight (kg)
        </Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Enter weight"
          placeholderTextColor={COLORS.textSecondary}
          style={[styles.input, { color: COLORS.textPrimary }]}
        />

        <Text style={[styles.label, { color: COLORS.textPrimary, marginTop: 15 }]}>
          Height (m)
        </Text>
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Enter height"
          placeholderTextColor={COLORS.textSecondary}
          style={[styles.input, { color: COLORS.textPrimary }]}
        />

        {/* BUTTON */}
        <TouchableOpacity
          onPress={calculateBMI}
          style={[styles.button, { backgroundColor: COLORS.primary }]}
        >
          <Text style={{ color: "white", fontFamily: Fonts.bold }}>
            Calculate
          </Text>
        </TouchableOpacity>
      </View>

      {/* RESULT */}
      {result !== "" && (
        <View style={[styles.resultCard, { backgroundColor: COLORS.card }]}>
          <Text style={[styles.resultText, { color: COLORS.textPrimary }]}>
            BMI: {result}
          </Text>

          {!isNaN(Number(result)) && (
            <Text style={{ color: COLORS.textSecondary, marginTop: 5 }}>
              Status: {getStatus(Number(result))}
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  resultCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
  },

  resultText: {
    fontSize: 22,
    fontWeight: "600",
  },
});