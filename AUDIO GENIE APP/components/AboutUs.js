import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

export default function AboutUs() {
  const navigation = useNavigation();
  const { theme, fontSize } = useUser();

  const getTextColor = () => (theme === 'dark' ? '#FFF' : '#000');
  const getFontSizeValue = () => {
    switch (fontSize) {
      case 'small':
        return 14;
      case 'medium':
        return 18;
      case 'large':
        return 22;
      default:
        return 18;
    }
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.darkTheme]}>
      <ImageBackground source={require('../images/aboutus.jpg')} style={styles.headerContainer1}>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Welcome to AudioGenie</Text>
        <Text style={[styles.content, { color: getTextColor(), fontSize: getFontSizeValue() }]}>
          At AudioGenie, we understand the demands of modern life, often leaving little time for navigating through vast audio libraries or discovering new sounds. That's why we've crafted a user-friendly app that empowers you to explore, discover, and enjoy a vast spectrum of audio content with just a few taps on your device.
        </Text>

        <Text style={[styles.content, { color: getTextColor(), fontSize: getFontSizeValue() }]}>
          Our mission is straightforward: to elevate your audio experience to new heights. Whether you're seeking music, podcasts, audiobooks, or ambient sounds, AudioGenie connects you with a diverse array of audio creators and genres, ensuring that you have access to an extensive range of auditory delights.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  darkTheme: {
    backgroundColor: '#333',
  },
  headerContainer1: {
    width: '100%',
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
});
