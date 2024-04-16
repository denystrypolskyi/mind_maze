import { useState } from "react";
import NumberInput from "../components/NumberInput";
import Button from "../components/Button";
import { StyleSheet, Text } from "react-native";
import { fonts, textSizes } from "../constants/constants";

const EnterNumberScreen = ({ targetNumber, onNumberSubmit }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  return (
    <>
      <Text style={[styles.header, { marginBottom: 15 }]}>
        What's the number?
      </Text>
      <NumberInput
        marginBottom={20}
        width="100%"
        value={enteredNumber}
        onChangeText={setEnteredNumber}
      />
      <Button text="Submit" onPress={() => onNumberSubmit(enteredNumber)} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    color: "#333333",
  },
});

export default EnterNumberScreen;
