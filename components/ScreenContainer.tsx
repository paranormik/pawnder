import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

type ScreenContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
  safeAreaBackgroundColor?: string;
};

export const ScreenContainer = ({
  children,
  style,
  edges = ["top", "right", "bottom", "left"],
  safeAreaBackgroundColor = "transparent",
}: ScreenContainerProps) => {
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: safeAreaBackgroundColor }]}
      edges={edges}
    >
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FBFAFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
