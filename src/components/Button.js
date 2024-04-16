import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { fonts, textSizes } from "../constants/constants";

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
});

export default Button;
