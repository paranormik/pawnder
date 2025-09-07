import { StyleSheet, Text } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";

const MessagesScreen = () => {
  return (
    <ScreenContainer
      style={{
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>01</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 80,
    fontSize: 126,
    color: "#BFBFC0",
    fontFamily: "NunitoSans-Bold",
  },
});

export default MessagesScreen;
