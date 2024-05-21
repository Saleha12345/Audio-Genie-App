// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [signupDetails, setSignupDetails] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    planType: '',
    price: '',
  });

  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
 

  useEffect(() => {
    const loadSettings = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      const storedFontSize = await AsyncStorage.getItem("fontSize");
      if (storedTheme) setTheme(storedTheme);
      if (storedFontSize) setFontSize(storedFontSize);
    };

    loadSettings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("theme", theme);
    AsyncStorage.setItem("fontSize", fontSize);
  }, [theme, fontSize]);

  return (
    <UserContext.Provider value={{ signupDetails, setSignupDetails, theme, setTheme, fontSize, setFontSize }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
