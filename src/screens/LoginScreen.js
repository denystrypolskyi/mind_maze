import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { login } from "../api/api";
import { redirectToSignUpPage } from "../utils/helpers";
import { fonts, textSizes } from "../constants/constants";

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLogged } = route.params;

  const handleLogin = async () => {
    await login(username, password, setIsLogged);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Welcome</Text>
        <Text style={[styles.header, { marginBottom: 45 }]}>Back</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={[styles.input, { marginBottom: 45 }]}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={[styles.buttonText, { color: "#0095FF" }]}>
              Log in
            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.horizontalLine} />
          </View>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => redirectToSignUpPage(navigation)}
          >
            <Text style={[styles.buttonText, { color: "#ffffff" }]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: "#55B8FF",
  },
  formContainer: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#0095FF",
    borderRadius: 20,
    padding: 14,
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#0095FF",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    color: "gray",
    fontFamily: fonts.bold,
    marginHorizontal: 10,
    fontSize: textSizes.medium,
  },
});

export default LoginScreen;
