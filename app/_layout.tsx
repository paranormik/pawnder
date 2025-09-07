import { useCustomFonts } from "@/utils/fonts";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Stack />;
}
