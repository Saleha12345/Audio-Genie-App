import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AboutUs() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
      </View> */}

      <ImageBackground source={require('../images/aboutus.jpg')} style={styles.headerContainer1}>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to AudioGenie</Text>
        <Text style={styles.content}>
      At AudioGenie, we understand the demands of modern life, often leaving little time for navigating through vast audio libraries or discovering new sounds. That's why we've crafted a user-friendly app that empowers you to explore, discover, and enjoy a vast spectrum of audio content with just a few taps on your device.
    </Text>

    <Text style={styles.content}>
      Our mission is straightforward: to elevate your audio experience to new heights. Whether you're seeking music, podcasts, audiobooks, or ambient sounds, AudioGenie connects you with a diverse array of audio creators and genres, ensuring that you have access to an extensive range of auditory delights.
    </Text>

    <Text style={styles.content}>
      What distinguishes AudioGenie is our unwavering commitment to quality. We partner with creators and platforms that share our dedication to exceptional audio content and delivery. Our team meticulously curates the content available on our platform, ensuring that only the finest selections reach your ears. Your trust is paramount to us, and we're dedicated to consistently providing you with a memorable listening experience, wherever you are.
    </Text>

    <Text style={styles.content}>
      With AudioGenie, you have the freedom to tailor your listening experience to suit your preferences. Whether you prefer curated playlists, personalized recommendations, or immersive audio experiences, our app empowers you to explore and enjoy audio content on your terms.
    </Text>

    <Text style={styles.content}>
      In addition to exploration and customization, AudioGenie offers a plethora of features to enhance your audio journey. From advanced discovery algorithms and personalized playlists to offline listening and high-quality streaming options, we're constantly innovating to enrich your audio experience.
    </Text>

    <Text style={styles.content}>
      Your satisfaction is our utmost priority. Our dedicated support team is available around the clock to address any questions, concerns, or feedback you may have. We're committed to delivering exceptional service and ensuring that your audio needs are met promptly and efficiently.
    </Text>

    <Text style={styles.content}>
      Join the AudioGenie community today and embark on a transformative audio journey. Download our app from the App Store or Google Play, and immerse yourself in a world of audio exploration like never before. We're here to redefine the way you listen to audio, one track at a time.
    </Text>

    <Text style={styles.footerText}>AudioGenie - Your audio, amplified.</Text>
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
  headerContainer: {
    backgroundColor: '#ED6474',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  backArrowContainer: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
});