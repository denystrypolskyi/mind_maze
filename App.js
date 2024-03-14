import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import GuessTheNumberScreen from "./src/screens/GuessTheNumberScreen";
import RememberNumberScreen from "./src/screens/RememberNumberScreen";
import { numbersRange } from "./src/constants/constants";
import { generateAnswerOptions, handleTimerEnd } from "./src/utils/helpers";

const App = () => {
  const [initialTimerSeconds] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(null);
  const [currentNumberLength, setCurrentNumberLength] = useState(2);
  const [isGuessTime, setIsGuessTime] = useState(false);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(initialTimerSeconds);

  const handleOptionClick = (selectedOption) => {
    if (correctNumber === selectedOption) {
      setIsGuessTime(false);
      setSecondsLeft(initialTimerSeconds);
      generateAnswerOptions(
        currentNumberLength,
        setAnswerOptions,
        setCorrectNumber,
        numbersRange
      );
    } else {
      console.log(false);
    }
  };

  useEffect(() => {
    if (!isGuessTime) {
      setCurrentNumberLength((previousCurrentNumberLength) => {
        if (previousCurrentNumberLength - 2 < numbersRange.length - 1) {
          return previousCurrentNumberLength + 1;
        } else {
          return previousCurrentNumberLength;
        }
      });
      generateAnswerOptions(
        currentNumberLength,
        setAnswerOptions,
        setCorrectNumber,
        numbersRange
      );
    }
  }, [isGuessTime]);

  useEffect(() => {
    setSecondsLeft(initialTimerSeconds);
    const intervalId = setInterval(() => {
      setSecondsLeft((prevValue) => {
        if (prevValue === 0) {
          handleTimerEnd(setIsGuessTime, initialTimerSeconds);
          return initialTimerSeconds;
        }
        return prevValue - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {!isGuessTime && (
        <RememberNumberScreen
          secondsLeft={secondsLeft}
          correctNumber={correctNumber}
        />
      )}
      {isGuessTime && (
        <GuessTheNumberScreen
          seconds={secondsLeft}
          answerOptions={answerOptions}
          handleOptionClick={handleOptionClick}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
