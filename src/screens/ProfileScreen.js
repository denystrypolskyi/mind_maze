import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { fonts, textSizes } from "../constants/constants";
import { fetchUserInfo, logout } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserInfo = ({ username, email }) => {
  return (
    <View style={styles.userInfoContainer}>
      <View
        style={[
          styles.userInfoItem,
          { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        ]}
      >
        <Ionicons name="person" size={20} color="green" />
        <Text style={styles.userInfoText}>{username}</Text>
      </View>
      <View
        style={[
          styles.userInfoItem,
          {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        ]}
      >
        <Ionicons name="mail" size={20} color="skyblue" />
        <Text style={styles.userInfoText}>{email}</Text>
      </View>
    </View>
  );
};

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
      <Text style={styles.header}>Profile</Text>
      <UserInfo username={userInfo.username} email={userInfo.email} />
      <View style={styles.trophyContainer}>
        <Animated.View style={cupStyle}>
          <Ionicons name="trophy" size={128} color="gold" />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  userInfoContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    color: "black",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    textAlign: "center",
    marginBottom: 20,
  },
  logout: {
    textAlign: "center",
    fontFamily: fonts.bold,
    fontSize: textSizes.large,
    color: "red",
  },
  userInfoText: {
    fontFamily: fonts.bold,
    fontSize: textSizes.large,
    textAlign: "center",
    color: "#333333",
    marginLeft: 5,
  },
  trophyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default ProfileScreen;

{
  /* <TouchableOpacity onPress={() => logout(setIsLogged)}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity> */
}
