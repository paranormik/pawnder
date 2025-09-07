import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import createIconSetFromIcoMoon from "@expo/vector-icons/createIconSetFromIcoMoon";
import { useFonts } from "expo-font";

export const Icon = createIconSetFromIcoMoon(
  require("../assets/icomoon/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    "NunitoSans-Regular": NunitoSans_400Regular,
    "NunitoSans-SemiBold": NunitoSans_600SemiBold,
    "NunitoSans-Bold": NunitoSans_700Bold,
    IcoMoon: require("../assets/icomoon/icomoon.ttf"),
  });

  return { fontsLoaded };
}

export const fontConfig = {
  regular: "NunitoSans-Regular",
  semiBold: "NunitoSans-SemiBold",
  bold: "NunitoSans-Bold",
};
