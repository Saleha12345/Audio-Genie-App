import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Switch, TouchableOpacity, Button, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [notificationPrefs, setNotificationPrefs] = useState({
    speakerAnalysisAlerts: false,
    systemUpdates: false,
  });
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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

  const handleNotificationPrefChange = (name, value) => {
    setNotificationPrefs((prevPrefs) => ({
      ...prevPrefs,
      [name]: value,
    }));
    Alert.alert(value ? `Receive alerts for ${name}` : `You have turned off notifications for ${name}`);
  };

  const themes = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];
  
  const fontSizes = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  const getTextColor = () => {
    return theme === "dark" ? "#FFF" : "#000";
  };

  const getFontSizeValue = () => {
    switch (fontSize) {
      case "small":
        return 14;
      case "medium":
        return 18;
      case "large":
        return 22;
      default:
        return 18;
    }
  };

  const dropdownStyles = {
    container: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      backgroundColor: theme === "dark" ? "#555" : "#fff",
    },
    text: {
      color: getTextColor(),
      fontSize: getFontSizeValue(),
    },
    dropdownItem: {
      padding: 10,
      backgroundColor: theme === "dark" ? "#555" : "#fff",
    },
    dropdownItemText: {
      color: getTextColor(),
    },
    selectedItem: {
      backgroundColor: theme === "dark" ? "#666" : "#ddd",
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, theme === "dark" && styles.darkTheme]}>
      {/* <Text style={[styles.header, { color: getTextColor()}]}>Settings</Text> */}

      <View style={styles.settingSection}>
        <Text style={[styles.label, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Theme</Text>
        <Dropdown
          style={[styles.dropdown, dropdownStyles.container]}
          placeholderStyle={dropdownStyles.text}
          selectedTextStyle={dropdownStyles.text}
          itemTextStyle={dropdownStyles.dropdownItemText}
          containerStyle={dropdownStyles.dropdownItem}
          selectedItemStyle={dropdownStyles.selectedItem}
          data={themes}
          labelField="label"
          valueField="value"
          placeholder="Select theme"
          value={theme}
          onChange={item => setTheme(item.value)}
        />
      </View>

      <View style={styles.settingSection}>
        <Text style={[styles.label, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Font Size</Text>
        <Dropdown
          style={[styles.dropdown, dropdownStyles.container]}
          placeholderStyle={dropdownStyles.text}
          selectedTextStyle={dropdownStyles.text}
          itemTextStyle={dropdownStyles.dropdownItemText}
          containerStyle={dropdownStyles.dropdownItem}
          selectedItemStyle={dropdownStyles.selectedItem}
          data={fontSizes}
          labelField="label"
          valueField="value"
          placeholder="Select font size"
          value={fontSize}
          onChange={item => setFontSize(item.value)}
        />
      </View>

      <View style={styles.settingSection}>
        <Text style={[styles.label, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Notification Preferences</Text>
        <View style={styles.switchContainer}>
          <Text style={{ color: getTextColor(), fontSize: getFontSizeValue() }}>Receive alerts for completed speaker analyses</Text>
          <Switch
            value={notificationPrefs.speakerAnalysisAlerts}
            onValueChange={(value) => handleNotificationPrefChange("speakerAnalysisAlerts", value)}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ color: getTextColor(), fontSize: getFontSizeValue() }}>Receive system update notifications</Text>
          <Switch
            value={notificationPrefs.systemUpdates}
            onValueChange={(value) => handleNotificationPrefChange("systemUpdates", value)}
          />
        </View>
      </View>

      <View style={styles.settingSection}>
        {/* <Text style={[styles.label, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Terms and Privacy</Text> */}
        <TouchableOpacity onPress={() => setShowTerms(!showTerms)}>
          <Text style={[styles.label, { color: getTextColor(), fontSize: getFontSizeValue() }]}>View Terms</Text>
        </TouchableOpacity>
        {showTerms && (
          <View style={styles.popup}>
            <Text style={[styles.popupText, { fontSize: getFontSizeValue() }]}>
              Subscription fees apply for full access. Users responsible for uploaded content. Admin monitors and manages user accounts.
            </Text>
            <Button title="Close" onPress={() => setShowTerms(false)} />
          </View>
        )}

        <TouchableOpacity onPress={() => setShowPrivacy(!showPrivacy)}>
          <Text style={[styles.label, { color: getTextColor(), fontSize: getFontSizeValue() }]}>View Privacy Policy</Text>
        </TouchableOpacity>
        {showPrivacy && (
          <View style={styles.popup}>
            <Text style={[styles.popupText, { fontSize: getFontSizeValue() }]}>
              We respect your privacy and safeguard any personal information you provide while using our platform. We do not share your data with third parties without your consent, and we employ robust security measures to protect against unauthorized access or misuse of your information. By using Audio Genie, you agree to our privacy policy and trust us to handle your data responsibly and ethically.
            </Text>
            <Button title="Close" onPress={() => setShowPrivacy(false)} />
          </View>
        )}
      </View>

      <View style={styles.settingSection}>
  <Text style={[styles.label, { color: getTextColor(), fontSize: getFontSizeValue() }]}>App Information</Text>
  <Text style={{ color: getTextColor(), fontSize: getFontSizeValue() }}>
    Changelog for AudioGenie Project: Version 1.0.0 (© 2023)
  </Text>
</View>
</ScrollView>
);}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  darkTheme: {
    backgroundColor: "#333",
  },
  header: {
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 24,
  },
  settingSection: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  link: {
    color: "#1E90FF",
    marginBottom: 10,
    fontSize: 18,
  },
  popup: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  popupText: {
    textAlign: "left",
    marginBottom: 20,
    fontSize: 18,
  },
});

export default Settings;

