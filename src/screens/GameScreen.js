import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import GameOverScreen from "./GameOverScreen";
import { generateNumber } from "../utils/helpers";
import { numbersRange } from "../constants/constants";
import { saveUserResult } from "../api/api";
import EnterNumberScreen from "./EnterNumberScreen";
import RememberNumberScreen from "./RememberNumberScreen";

const GameScreen = ({ route }) => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [initialTimerSeconds] = useState(2);
  const [currentNumberLength, setCurrentNumberLength] = useState(2);
  const [remainingTimerSeconds, setRemainingTimerSeconds] =
    useState(initialTimerSeconds);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isGuessTime, setIsGuessTime] = useState(false);
  const [hasLostGame, setHasLostGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsLogged } = route.params;

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

  const handleNumberSubmission = async (enteredText) => {
    const parsedNumber = parseFloat(enteredText);
    if (
      !isNaN(parsedNumber) &&
      parsedNumber !== "" &&
      parsedNumber === targetNumber
    ) {
      moveToNextLevel();
    } else {
      setHasLostGame(true);
      setIsLoading(true);
      await saveUserResult(currentLevel, setIsLogged);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    setTargetNumber(null);
    setCurrentNumberLength(2);
    setRemainingTimerSeconds(initialTimerSeconds);
    setCurrentLevel(1);
    setIsGuessTime(false);
    setHasLostGame(false);
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <View style={styles.container}>
      {!isGuessTime && !hasLostGame && (
        <RememberNumberScreen
          targetNumber={targetNumber}
          remainingTimerSeconds={remainingTimerSeconds}
        />
      )}
      {isGuessTime && !hasLostGame && (
        <EnterNumberScreen
          targetNumber={targetNumber}
          onNumberSubmit={handleNumberSubmission}
        />
      )}
      {hasLostGame && (
        <GameOverScreen
          targetNumber={targetNumber}
          levelReached={currentLevel}
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
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default GameScreen;
