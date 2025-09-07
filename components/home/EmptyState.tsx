import { StyleSheet, Text, View } from "react-native";

export const EmptyState = () => {
  return (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>No more profiles to show</Text>
      <Text style={styles.emptyStateSubText}>
        Check back later for more matches!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  emptyStateSubText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
