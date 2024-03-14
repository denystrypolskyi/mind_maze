import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const GuessTheNumberScreen = ({
  seconds,
  answerOptions,
  handleOptionClick,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prevValue) => {
        if (prevValue === 0) {
          return 0;
        }
        return prevValue - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <View style={styles.optionsContainer}>
        {answerOptions.map((option, index) => (
          <TouchableOpacity
            style={styles.optionBox}
            key={index}
            onPress={() => {
              handleOptionClick(option);
            }}
          >
            <Text style={styles.textCenter}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.textCenter}>{secondsLeft} seconds left</Text>
    </>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionsContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionBox: {
    width: "40%",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: "#DDBDD5",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default GuessTheNumberScreen;
