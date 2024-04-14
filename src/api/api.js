import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/constants";
import { Alert } from "react-native";

export const checkAuthentication = async (setIsLogged) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        `${API_ENDPOINTS.VERIFY_TOKEN}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLogged(true);
      } else {
        console.error("Authentication failed:", response.data);
        Alert.alert("Authentication failed:", response.data);
        await AsyncStorage.removeItem("token");
        setIsLogged(false);
      }
    } else {
      // If no token found
      setIsLogged(false);
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    Alert.alert("Error checking authentication:", error.message);
    setIsLogged(false);
  }
};

export const logout = async (setIsLogged) => {
  try {
    await AsyncStorage.removeItem("token");
    setIsLogged(false);
    console.log("You have been successfully logged out.");
    Alert.alert("Logged Out", "You have been successfully logged out.");
  } catch (error) {
    console.error("Failed to log out. Please try again later.");
    Alert.alert("Error", "Failed to log out. Please try again later.");
  }
};

export const login = async (username, password, setIsLogged) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.LOGIN}`, {
      username,
      password,
    });

    if (response.status === 200) {
      const token = response.data;
      console.log(`Token: ${token}`);
      await AsyncStorage.setItem("token", token);
      setIsLogged(true);
    } else {
      console.error("Login failed:", response.data);
      Alert.alert("Login failed:", response.data);
      setIsLogged(false);
    }
  } catch (error) {
    console.error("Error logging in:", error);
    Alert.alert("Error logging in:", error.message);
    setIsLogged(false);
  }
};

export const signUp = async (email, username, password) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.REGISTER}`, {
      email,
      username,
      password,
    });

    if (response.status === 200) {
      console.log("User registered successfully");
      Alert.alert("User registered successfully");
      return true;
    } else {
      console.error("Registration failed:", response.data);
      Alert.alert("Registration failed:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    Alert.alert("Error registering user:", error.message);
    return false;
  }
};

export const fetchUserInfo = async (setIsLogged, setUserInfo) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.USER_INFO}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      console.error("Failed to fetch user information");
      Alert.alert("Failed to fetch user information");
      return;
    }

    const userData = response.data;

    setUserInfo(userData);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Token expired or invalid:", error.response.data);
      Alert.alert(
        "Token Expired",
        "Your session has expired. Please log in again."
      );
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
    } else {
      console.error("Error fetching user information:", error);
      Alert.alert("Error fetching user information:", error);
    }
  }
};

export const fetchLeaderboardResults = async (setIsLogged, setUserResults) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.USER_RESULTS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      Alert.alert("No Data", "No leaderboard data available.");
      return [];
    }

    const leaderboardData = response.data;

    leaderboardData.sort((a, b) => b.maxLevelReached - a.maxLevelReached);

    setUserResults(leaderboardData);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Token expired or invalid:", error.response.data);
      Alert.alert(
        "Token Expired",
        "Your session has expired. Please log in again."
      );
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
    } else {
      console.error("Error fetching leaderboard information:", error);
      Alert.alert("Error fetching leaderboard information:", error);
    }
    return [];
  }
};
