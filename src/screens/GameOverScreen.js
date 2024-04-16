import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { fonts, textSizes } from "../constants/constants";
import Button from "../components/Button";

const GameOverScreen = ({ levelReached, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.header, { marginBottom: 15 }]}>You Reached Level {levelReached}</Text>
      <Button text="Retry" onPress={onRetry} />
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
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    color: "#333333",
  },
});

export default GameOverScreen;
