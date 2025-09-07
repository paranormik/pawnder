import { StyleSheet, View, ViewStyle } from "react-native";
import { Icon } from "../../utils/fonts";
import { ActionButton } from "../ActionButton";

type ActionButtonsProps = {
  onDislikePress: () => void;
  onLikePress: () => void;
  style?: ViewStyle;
};

export const ActionButtons = ({
  onDislikePress,
  onLikePress,
  style,
}: ActionButtonsProps) => {
  return (
    <View style={[styles.actionButtonsContainer, style]}>
      <ActionButton
        accessibilityLabel="dislike"
        onPress={onDislikePress}
        icon={<Icon name="x" size={32} color="#E16359" />}
      />
      <ActionButton
        accessibilityLabel="like"
        onPress={onLikePress}
        icon={<Icon name="heart" size={32} color="#6BD88E" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 48,
  },
});
