import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountdownProgressBar from "../components/CountdownProgressBar";
import NumberInput from "../components/NumberInput";
import GameLostScreen from "./IncorrectAnswerScreen";
import { generateNumber } from "../utils/helpers";
import { fonts, numbersRange } from "../constants/constants";

const PlayScreen = () => {
  const [initialTimerSeconds] = useState(10);
  const [targetNumber, setTargetNumber] = useState(null);
  const [currentNumberLength, setCurrentNumberLength] = useState(2);
  const [remainingTimerSeconds, setRemainingTimerSeconds] =
    useState(initialTimerSeconds);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [lastUserInput, setLastUserInput] = useState("");
  const [isGuessTime, setIsGuessTime] = useState(false);
  const [hasLostGame, setHasLostGame] = useState(false);

  useEffect(() => {
    if (!isGuessTime) {
      setTargetNumber(generateNumber(currentNumberLength - 2));
      setRemainingTimerSeconds(initialTimerSeconds);
      const intervalId = setInterval(() => {
        setRemainingTimerSeconds((prev) => {
          if (prev === 1) {
            clearInterval(intervalId);
            setIsGuessTime(true);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isGuessTime]);

  const moveToNextLevel = () => {
    setCurrentNumberLength((previousCurrentNumberLength) =>
      Math.min(previousCurrentNumberLength + 1, numbersRange.length + 1)
    );
    setIsGuessTime(false);
    setCurrentLevel((prev) => prev + 1);
    setRemainingTimerSeconds(initialTimerSeconds);
  };

  const handleNumberSubmission = (enteredText) => {
    setLastUserInput(enteredText);
    const parsedNumber = parseFloat(enteredText);
    if (
      !isNaN(parsedNumber) &&
      parsedNumber !== "" &&
      parsedNumber === targetNumber
    ) {
      moveToNextLevel();
    } else {
      setHasLostGame(true);
    }
  };

  const resetGame = () => {
    setTargetNumber(null);
    setCurrentNumberLength(2);
    setRemainingTimerSeconds(initialTimerSeconds);
    setCurrentLevel(1);
    setLastUserInput("");
    setIsGuessTime(false);
    setHasLostGame(false);
  };

  return (
    <View style={styles.container}>
      {!isGuessTime && !hasLostGame && (
        <>
          <Text style={styles.header}>{targetNumber}</Text>
          <CountdownProgressBar seconds={remainingTimerSeconds} width={200} />
        </>
      )}
      {isGuessTime && !hasLostGame && (
        <NumberInput
          targetNumber={targetNumber}
          onNumberSubmit={handleNumberSubmission}
        />
      )}
      {hasLostGame && (
        <GameLostScreen
          targetNumber={targetNumber}
          userInput={lastUserInput}
          maxLevelReached={currentLevel}
          onRetry={resetGame}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: "#0095FF",
  },
});

export default PlayScreen;
