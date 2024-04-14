import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { fonts, textSizes } from "../constants/constants";

const IncorrectAnswerScreen = ({ maxLevelReached, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Oops! You Lost</Text>
      <Text style={styles.subHeader}>Reached Level {maxLevelReached}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  header: {
    color: "#495057",
    fontSize: textSizes.huge,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  subHeader: {
    color: "#6c757d",
    fontSize: textSizes.large,
    fontFamily: fonts.regular,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
});

export default IncorrectAnswerScreen;
