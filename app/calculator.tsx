import AppHeader from "@/components/AppHeader";
import { Fonts } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../hooks/useTheme";

const BUTTONS = [
  ["C", "⌫", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export default function Calculator() {
  const COLORS = useTheme();

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value: string) => {
    if (value === "C") {
      setInput("");
      setResult("");
      return;
    }

    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      try {
        const res = eval(input);
        setResult(res.toString());
      } catch {
        setResult("Error");
      }
      return;
    }

    setInput((prev) => prev + value);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: COLORS.background }]}
      edges={["top", "left", "right"]}
    >
      {/* HEADER */}
      <AppHeader title="Calculator" />

      {/* DISPLAY */}
      <View style={[styles.display, { backgroundColor: COLORS.card }]}>
        <Text
          style={[
            styles.inputText,
            { color: COLORS.textSecondary, fontFamily: Fonts.regular },
          ]}
        >
          {input || "0"}
        </Text>

        <Text
          style={[
            styles.resultText,
            { color: COLORS.textPrimary, fontFamily: Fonts.bold },
          ]}
        >
          {result}
        </Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        {BUTTONS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => {
              const isOperator = ["+", "-", "*", "/", "="].includes(btn);

              return (
                <TouchableOpacity
                  key={btn}
                  style={[
                    styles.button,
                    {
                      backgroundColor: isOperator
                        ? COLORS.primary
                        : COLORS.card,
                      flex: btn === "0" ? 2 : 1,
                    },
                  ]}
                  onPress={() => handlePress(btn)}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: isOperator ? "white" : COLORS.textPrimary,
                      fontFamily: Fonts.bold,
                    }}
                  >
                    {btn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  display: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    minHeight: 120,
    justifyContent: "space-between",
  },

  inputText: {
    fontSize: 24,
  },

  resultText: {
    fontSize: 32,
    textAlign: "right",
  },

  buttonsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  button: {
    padding: 20,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
