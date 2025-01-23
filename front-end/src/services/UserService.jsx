import axios from "axios";
import { IP_ADDRS } from "./BaseAddress";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${IP_ADDRS}/users/register`, userData);
    return response.data; // Successful registration
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

// Log in a user with credentials
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${IP_ADDRS}/login`,
      new URLSearchParams({
        username: credentials.username,
        password: credentials.password,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );
    return response.data; // Return user data on successful login
  } catch (error) {
    console.error(
      "Login Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Log out the user
export const logoutUser = async () => {
  try {
    await axios.post(
      `${IP_ADDRS}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(
      "Logout Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Check if the user is logged in
export const checkLoginStatus = async () => {
  try {
    const response = await axios.get(`${IP_ADDRS}/users/authenticate`, {
      withCredentials: true,
    });
    return response.data; // Return user data if logged in
  } catch (error) {
    console.error("Check Login Status Error:", error);
    return null; // Return null if not logged in
  }
};