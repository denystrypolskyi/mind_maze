import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { fonts, textSizes } from "../constants/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchUserInfo, logout } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ route }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [animateCup] = useState(new Animated.Value(0));

  const { setIsLogged } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const getUserInfoAndAnimateCup = async () => {
        setIsLoading(true);
        await fetchUserInfo(setIsLogged, setUserInfo);
        setTimeout(() => {
          setIsLoading(false);
          animateCupEffect();
        }, 1000);
      };
      getUserInfoAndAnimateCup();
    }, [])
  );

  const animateCupEffect = () => {
    animateCup.setValue(0);

    Animated.timing(animateCup, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const cupStyle = {
    transform: [
      {
        scale: animateCup.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
    ],
  };

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
          <View style={styles.userInfoContainer}>
            <Text style={styles.profileHeader}>Profile</Text>
            {/* <Text style={styles.username}>{userInfo.username}</Text> */}
          </View>

          <View style={styles.rankContainer}>
            <Animated.View style={[styles.placeContainer, cupStyle]}>
              <Ionicons name="trophy" size={128} color="gold" />
            </Animated.View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  userInfoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  profileHeader: {
    color: "gray",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    textAlign: "center",
    marginBottom: 20,
  },
  username: {
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
    textAlign: "center",
  },
  rankContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  rankText: {
    color: "gold",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    marginRight: 5,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default ProfileScreen;
