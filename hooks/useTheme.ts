//import { useColorScheme } from "react-native";
//import { Colors } from '../constants/theme';

//export default function useTheme() {
 // const scheme = useColorScheme();

 // return scheme === "dark" ? Colors.dark : Colors.light;
//}
import { useAppTheme } from "../context/ThemeContext";
import { Colors } from "../constants/theme";

export default function useTheme() {
  const { theme } = useAppTheme();
  return Colors[theme];
}