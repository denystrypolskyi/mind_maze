import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GameLostScreen = ({ maxLevelReached }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Maximum level reached: {maxLevelReached}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
});

export default GameLostScreen;
