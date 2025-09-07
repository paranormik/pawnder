import { StyleSheet, View } from "react-native";

type SwipeOverlayProps = {
  color: string;
};

export const SwipeOverlay = ({ color }: SwipeOverlayProps) => {
  return (
    <View
      style={[
        styles.overlayLabelContainer,
        {
          backgroundColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  overlayLabelContainer: {
    borderRadius: 15,
    height: "93%",
    width: "100%",
  },
});
