import { numbersRange } from "../constants/constants";

export const generateNumber = (currentNumberLength) => {
  max = numbersRange[currentNumberLength].max;
  min = numbersRange[currentNumberLength].min;

  number = Math.floor(Math.random() * (max - min + 1)) + min;

  return number;
};

export const redirectToLoginPage = (navigation) => {
  navigation.navigate("Login");
};

export const redirectToSignUpPage = (navigation) => {
  navigation.navigate("SignUp");
};
