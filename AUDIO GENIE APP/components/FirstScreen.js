import * as React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get('window').width;

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.image} />
       <Text style={styles.text}>
        <Text style={styles.boldText}>Audio Genie</Text>
      </Text>
      <Text style={styles.subtext}>Unveiling Clarity, Separating Voices.</Text>
       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9F5FF',
    paddingTop:50,
  },
  image: {
    width: 260,
    height: 250,
    marginVertical: 80,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0040B5',
    marginTop:-60,
  },
  subtext:{
    fontSize: 24,
    textAlign: 'center',
    marginTop:5,
    paddingHorizontal:10,
  },
  boldText: {
    fontWeight: 'bold'
  },

  button: {
    width: '80%',
    backgroundColor: '#0040B5',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop:85,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
});

export default OnboardingScreen;
