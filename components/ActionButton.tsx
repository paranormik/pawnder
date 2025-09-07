import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

type ActionButtonProps = {
  accessibilityLabel: string;
  onPress: () => void;
  style?: ViewStyle;
  icon?: ReactNode;
};

export const ActionButton = ({
  accessibilityLabel,
  onPress,
  style,
  icon,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={style}
      activeOpacity={0.5}
    >
      <View style={styles.button}>{icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    width: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 27,
    shadowColor: "#BFBFC0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
