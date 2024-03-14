import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RememberNumberScreen = ({ secondsLeft, correctNumber }) => {
  return (
    <View>
      <Text>
        <Text style={styles.optionBox}>{correctNumber}</Text> is the number you
        have to remember
      </Text>
      <Text style={styles.textCenter}>{secondsLeft} seconds left</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
  },
});

export default RememberNumberScreen;
