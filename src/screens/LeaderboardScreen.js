import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { fetchLeaderboardResults } from "../api/api";
import { fonts, textSizes } from "../constants/constants";
import { useFocusEffect } from "@react-navigation/native";
import LeaderboardItem from "../components/LeaderboardItem";

const LeaderboardScreen = ({ route }) => {
  const [userResults, setUserResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setIsLogged } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const getLeaderboardData = async () => {
        setIsLoading(true);
        await fetchLeaderboardResults(setIsLogged, setUserResults);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      };
      getLeaderboardData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      ) : (
        <>
          <Text style={styles.leaderboardHeader}>Leaderboard</Text>
          <FlatList
            data={userResults}
            renderItem={({ item, index }) => (
              <LeaderboardItem
                place={index + 1}
                username={item.username}
                bestResult={item.maxLevelReached}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  leaderboardHeader: {
    color: "gray",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    textAlign: "center",
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default LeaderboardScreen;
