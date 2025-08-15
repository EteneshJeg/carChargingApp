import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE_URL = "https://e-mobility-api.techiveet.com/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app start, load user and token from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          // Optional: set token to axios headers
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // Fetch user profile (or decode token)
          const response = await axios.get(`${API_BASE_URL}/me`);
          if (response.data.success) {
            setUser(response.data.data.user);
          } else {
            setUser(null);
            await AsyncStorage.removeItem("userToken");
          }
        }
      } catch (error) {
        console.log("Failed to load user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async (name, email, password, phone_number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        phone_number,
      });

      if (response.data.success) {
        const { token, user } = response.data.data;

        //save token to AsyncStorage
        await AsyncStorage.setItem("userToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);

        return { success: true };
      } else {
        return {
          success: false,
          errors: response.data.errors || response.data.message,
        };
      }
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      return { success: false, errors: error.response?.data || error.message };
    }
  };

  // Login function
  const login = async (phone_number, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        phone_number,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data.data;

        await AsyncStorage.setItem("userToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);

        return { success: true };
      } else {
        return {
          success: false,
          errors: response.data.message || "Login failed",
        };
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return {
        success: false,
        errors: error.response?.data || error.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("userToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
