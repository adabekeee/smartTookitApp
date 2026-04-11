import AppHeader from "@/components/AppHeader";
import { useEffect, useState } from "react";
import {
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
  }, [type]);

  const handleConvert = (input: string) => {
    setValue(input);
    const num = parseFloat(input);
    if (!num) return setResult("");

    let res = 0;

    if (type === "length") res = convertLength(num, fromUnit, toUnit);
    if (type === "weight") res = convertWeight(num, fromUnit, toUnit);
    if (type === "temperature") res = convertTemperature(num, fromUnit, toUnit);
    if (type === "currency") res = convertCurrency(num, fromUnit, toUnit);

    setResult(res.toString());
  };

  const swapUnits = () => {
    setFromUnit((prevFrom) => {
      setToUnit(prevFrom);
      return toUnit;
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["top", "left", "right"]}
    >
      <View style={{ flex: 1, padding: 20, gap: 20 }}>
        {/* ✅ REUSABLE HEADER */}
        <AppHeader title="Converter" />

        {/* TABS */}
        <View style={[styles.tabContainer, {backgroundColor: COLORS.card}]}>
          <View style={[styles.toggleContainer]}>
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
        </View>

        <View style = {styles.section}>
          {/* INPUT */}
          <View >
            <View style={[styles.box, { backgroundColor: COLORS.card }]}>
              <TextInput
                placeholder="Enter value"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="numeric"
                value={value}
                onChangeText={handleConvert}
                style={[styles.input, { color: COLORS.textPrimary }]}
              />

              <TouchableOpacity onPress={() => setActiveSelector("from")}>
                <Text style={{ color: COLORS.textSecondary }}>
                  From: {fromUnit} ▼
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SWAP */}
          <TouchableOpacity
            style={[styles.swap, { backgroundColor: COLORS.primary }]}
            onPress={swapUnits}
          >
            <Text style={{ color: "white" }}>⇅</Text>
          </TouchableOpacity>

          {/* OUTPUT */}
          <View>
            <View style={[styles.box, { backgroundColor: COLORS.card }]}>
              <Text style={[styles.result, { color: COLORS.textPrimary }]}>
                {result || "0"}
              </Text>

              <TouchableOpacity onPress={() => setActiveSelector("to")}>
                <Text style={{ color: COLORS.textSecondary }}>
                  To: {toUnit} ▼
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
                  onPress={() => {
                    if (activeSelector === "from") {
                      setFromUnit(unit);
                    } else {
                      setToUnit(unit);
                    }

                    setActiveSelector(null);
                    handleConvert(value);
                  }}
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
  wrapper: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tabText: {
    color: "#374151",
  },
  activeTabText: {
    color: "white",
    fontWeight: "600",
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
    backgroundColor: "#417aca",
    alignSelf: "center",
    padding: 10,
    borderRadius: 50,
    // marginVertical: 10,
  },
  tabContainer: {
    borderRadius: 12, 
    alignItems: "center",
    padding: 4,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    padding: 8,
    fontSize: 16,
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
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
