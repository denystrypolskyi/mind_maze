import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { generateNumber } from "../utils/helpers";
import { numbersRange } from "../constants/constants";
import GameLostScreen from "./GameLostScreen";

const HomeScreen = () => {
  const [initialTimerSeconds] = useState(5);
  const [targetNumber, setTargetNumber] = useState(null);
  const [currentNumberLength, setCurrentNumberLength] = useState(2);
  const [remainingTimerSeconds, setRemainingTimerSeconds] =
    useState(initialTimerSeconds);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isGuessTime, setIsGuessTime] = useState(false);
  const [hasLostGame, setHasLostGame] = useState(false);

  const handleEndEditing = (enteredText) => {
    const parsedNumber = parseFloat(enteredText);
    if (
      !isNaN(parsedNumber) &&
      parsedNumber !== "" &&
      parsedNumber === targetNumber
    ) {
      setCurrentNumberLength((previousCurrentNumberLength) => {
        if (previousCurrentNumberLength - 2 < numbersRange.length - 1) {
          return previousCurrentNumberLength + 1;
        } else {
          return previousCurrentNumberLength;
        }
      });
      setCurrentLevel((prev) => prev + 1);
      setIsGuessTime(false);
    } else {
      setHasLostGame(true);
    }
  };

  useEffect(() => {
    if (!isGuessTime) {
      setTargetNumber(generateNumber(currentNumberLength - 2));
      setRemainingTimerSeconds(initialTimerSeconds);
      const intervalId = setInterval(() => {
        setRemainingTimerSeconds((prev) => {
          if (prev === 1) {
            clearInterval(intervalId);
            setIsGuessTime((prev) => !prev);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isGuessTime]);

  return (
    <View style={styles.container}>
      {!isGuessTime && !hasLostGame && (
        <>
          <Text style={styles.text}>{remainingTimerSeconds} seconds left</Text>
          <Text style={styles.text}>
            {targetNumber} is the number you have to remember
          </Text>
        </>
      )}
      {isGuessTime && !hasLostGame && (
        <>
          <TextInput
            style={[styles.input, styles.text, styles.textCenter]}
            onEndEditing={(event) => handleEndEditing(event.nativeEvent.text)}
            placeholder={`enter the number *${targetNumber}*`}
            keyboardType="decimal-pad"
          />
        </>
      )}
      {hasLostGame && <GameLostScreen maxLevelReached={currentLevel} />}
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
  textCenter: {
    textAlign: "center",
  },
  input: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default HomeScreen;
