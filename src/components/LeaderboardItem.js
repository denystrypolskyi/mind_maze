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
    borderColor = "gray";
    color = "gray";
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
  },
  placeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
  },
  place: {
    color: "gray",
    fontFamily: fonts.bold,
  },
  userInfoContainer: {
    marginLeft: 20,
  },
  username: {
    color: "gray",
    fontFamily: fonts.bold,
    fontSize: textSizes.large,
  },
  bestResult: {
    color: "lightgray",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
});

export default LeaderboardItem;
