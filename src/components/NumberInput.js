import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { fonts, textSizes } from "../constants/constants";

const NumberInput = ({ targetNumber, onNumberSubmit }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What's the Number?</Text>
      {/* <Text style={styles.targetNumber}>Target: {targetNumber}</Text> */}
      <View style={[styles.inputContainer, { marginBottom: 15 }]}>
        <TextInput
          style={styles.input}
          onChangeText={setEnteredNumber}
          value={enteredNumber}
          keyboardType="numeric"
          placeholder="Enter the number..."
          textAlign="center"
          placeholderTextColor="#6c757d"
        />
      </View>
      <TouchableOpacity
        style={[styles.submitButton, { marginTop: 10 }]}
        onPress={() => onNumberSubmit(enteredNumber)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  header: {
    color: "#495057",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    marginBottom: 10,
  },
  targetNumber: {
    color: "#6c757d",
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "100%",
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
    paddingVertical: 12,
    paddingHorizontal: 25,
    color: "#000000",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
});

export default NumberInput;
