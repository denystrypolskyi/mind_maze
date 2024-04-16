export const numbersRange = [
  { min: 10, max: 99 },
  { min: 100, max: 999 },
  { min: 1000, max: 9999 },
  { min: 10000, max: 99999 },
  { min: 100000, max: 999999 },
  { min: 1000000, max: 9999999 },
  { min: 10000000, max: 99999999 },
  { min: 100000000, max: 999999999 },
  { min: 1000000000, max: 9999999999 },
];

export const colors = {
  primary: "#0095FF",
  darkGray: "#495057",
  lightGray: "#F0F0F0",
  white: "#FFFFFF",
};

export const fonts = {
  regular: "Poppins-Regular",
  bold: "Poppins-Bold",
};

export const textSizes = {
  small: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  huge: 32,
};

export const API_BASE_URL = "http://192.168.1.14:3000";

export const API_ENDPOINTS = {
  USER_INFO: `${API_BASE_URL}/user-info`,
  VERIFY_TOKEN: `${API_BASE_URL}/verify-token`,
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  USER_RESULTS: `${API_BASE_URL}/user-results`,
  SAVE_RESULT: `${API_BASE_URL}/save-result`,
};
