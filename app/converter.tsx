import AppHeader from "@/components/AppHeader";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UNITS } from "../constants/units";
import useTheme from "../hooks/useTheme";
import {
  convertCurrency,
  convertLength,
  convertTemperature,
  convertWeight,
} from "../utils/conversions";

type ConverterType = "length" | "weight" | "temperature" | "currency";

const TYPES: ConverterType[] = ["length", "weight", "temperature", "currency"];

export default function Converter() {
  const COLORS = useTheme();

  const [type, setType] = useState<ConverterType>("length");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const [activeSelector, setActiveSelector] = useState<"from" | "to" | null>(
    null,
  );

  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  useEffect(() => {
    setFromUnit(UNITS[type][0]);
    setToUnit(UNITS[type][1]);
    setValue("");
    setResult("");
  }, [type]);

  const handleConvert = (input: string) => {
    setValue(input);

    if (!input.trim()) {
      setResult("");
      return;
    }

    const num = parseFloat(input);
    if (isNaN(num)) return setResult("");

    let res = 0;

    if (type === "length") res = convertLength(num, fromUnit, toUnit);
    if (type === "weight") res = convertWeight(num, fromUnit, toUnit);
    if (type === "temperature") res = convertTemperature(num, fromUnit, toUnit);
    if (type === "currency") res = convertCurrency(num, fromUnit, toUnit);

    setResult(res.toString());
  };

  const swapUnits = () => {
    Keyboard.dismiss();

    setFromUnit(toUnit);
    setToUnit(fromUnit);

    setValue("");
    setResult("");
  };

  const selectUnit = (unit: string) => {
    Keyboard.dismiss();

    if (activeSelector === "from") {
      setFromUnit(unit);
    } else {
      setToUnit(unit);
    }

    setActiveSelector(null);
    setValue("");
    setResult("");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: COLORS.background }]}
    >
      <View style={styles.wrapper}>
        <AppHeader title="Converter" />

        {/* TABS */}
        <View
          style={[styles.toggleContainer, { backgroundColor: COLORS.card }]}
        >
          {TYPES.map((item) => {
            const isActive = type === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setType(item)}
                style={[
                  styles.toggleItem,
                  isActive && { backgroundColor: COLORS.primary },
                ]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    { color: isActive ? "white" : COLORS.textSecondary },
                  ]}
                >
                  {item === "temperature"
                    ? "Temp"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* INPUT */}
        <View style={[styles.box, { backgroundColor: COLORS.card }]}>
          <TextInput
            placeholder="Enter value"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric"
            value={value}
            onChangeText={handleConvert}
            style={[styles.input, { color: COLORS.textPrimary }]}
          />

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setActiveSelector("from");
            }}
          >
            <Text style={{ color: COLORS.textSecondary }}>
              From: {fromUnit} ▼
            </Text>
          </TouchableOpacity>
        </View>

        {/* SWAP */}
        <TouchableOpacity
          style={[styles.swap, { backgroundColor: COLORS.primary }]}
          onPress={swapUnits}
        >
          <Text style={{ color: "white" }}>⇅</Text>
        </TouchableOpacity>

        {/* OUTPUT */}
        <View style={[styles.box, { backgroundColor: COLORS.card }]}>
          <Text style={[styles.result, { color: COLORS.textPrimary }]}>
            {result || "0"}
          </Text>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setActiveSelector("to");
            }}
          >
            <Text style={{ color: COLORS.textSecondary }}>To: {toUnit} ▼</Text>
          </TouchableOpacity>
        </View>

        {/* BOTTOM SHEET */}
        {activeSelector && (
          <View style={styles.overlay}>
            <View style={[styles.sheet, { backgroundColor: COLORS.card }]}>
              <Text style={[styles.sheetTitle, { color: COLORS.textPrimary }]}>
                Select Unit
              </Text>

              {UNITS[type].map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={styles.sheetItem}
                  onPress={() => selectUnit(unit)}
                >
                  <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity onPress={() => setActiveSelector(null)}>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: COLORS.primary,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
  },
  toggleItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 13,
    fontWeight: "500",
  },
  box: {
    padding: 20,
    borderRadius: 16,
  },
  input: {
    fontSize: 22,
    marginBottom: 10,
  },
  result: {
    fontSize: 22,
    marginBottom: 10,
  },
  swap: {
    alignSelf: "center",
    padding: 10,
    borderRadius: 50,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  sheet: {
    width: "85%",
    padding: 20,
    borderRadius: 20,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  sheetItem: {
    paddingVertical: 12,
  },
});
