import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type FilterBarProps = {
  options: {
    icon: ReactElement<{ size: number; color: string }>;
    label: string;
  }[];
  selectedFilter: number;
  setSelectedFilter: (filter: number) => void;
};

export const FilterBar = ({
  selectedFilter,
  setSelectedFilter,
  options,
}: FilterBarProps) => {
  return (
    <View style={styles.filterContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.label}
          onPress={() => setSelectedFilter(index)}
          style={[
            styles.filterButton,
            selectedFilter === index && styles.filterButtonSelected,
          ]}
        >
          {option.icon &&
            React.cloneElement(option.icon, {
              color: selectedFilter === index ? "#FD267D" : "#BFBFC0",
            })}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    borderRadius: 28,
    backgroundColor: "#E3E3E4",
    padding: 2,
  },
  filterButton: {
    paddingVertical: 4,
    width: 40,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonSelected: {
    backgroundColor: "#ffffff",
  },
});
