import { StyleSheet, Text } from "react-native";
import CountdownProgressBar from "../components/CountdownProgressBar";
import { fonts, textSizes } from "../constants/constants";

const RememberNumberScreen = ({ targetNumber, remainingTimerSeconds }) => {
  return (
    <>
      <Text style={[styles.header, {marginBottom: 10}]}>{targetNumber}</Text>
      <CountdownProgressBar seconds={remainingTimerSeconds} width={300} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    color: "#0095FF",
  },
});
export default RememberNumberScreen;
