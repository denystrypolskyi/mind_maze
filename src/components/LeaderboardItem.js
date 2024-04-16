import { StyleSheet, Text, View } from "react-native";
import { fonts, textSizes } from "../constants/constants";

const LeaderboardItem = ({ place, username, bestResult }) => {
  let backgroundColor;
  let borderColor;
  let color;
  if (place === 1) {
    backgroundColor = "#FFD700";
    borderColor = "#FFD700";
    color = "#FFD700";
  } else if (place === 2) {
    backgroundColor = "#C0C0C0";
    borderColor = "#C0C0C0";
    color = "#C0C0C0";
  } else if (place === 3) {
    backgroundColor = "#CD7F32";
    borderColor = "#CD7F32";
    color = "#CD7F32";
  } else {
    backgroundColor = "white";
    borderColor = "#555555";
    color = "#555555";
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.placeContainer, { borderColor }]}>
        <Text style={[styles.place, { color }]}>{place}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.bestResult}>{bestResult}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "white",
  },
  placeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#555555",
    borderWidth: 2,
  },
  place: {
    color: "#555555",
    fontFamily: fonts.bold,
    fontSize: textSizes.small,
  },
  userInfoContainer: {
    marginLeft: 20,
  },
  username: {
    color: "#444444",
    fontFamily: fonts.bold,
    fontSize: textSizes.large,
  },
  bestResult: {
    color: "#888888",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
});

export default LeaderboardItem;
