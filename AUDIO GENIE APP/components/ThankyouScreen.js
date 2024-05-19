import React from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ThankyouScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
         <Text style={styles.headerText}>FlavorDash</Text>
         </View>

      <Image
        source={require('../images/thanks.jpg')} // Replace with the actual path to your image
        style={styles.image}
      />
      <Text style={styles.text}>Thank you for your order.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#ED6474',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    width: '100%',
    
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: 'contain',
  },
 
  button: {
    width: '65%',
    backgroundColor: '#ED6474',
    borderRadius: 15,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginVertical: 50,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ED6474',
    marginTop:20,
    marginBottom:60,
    marginHorizontal:50,
    
  },
});

export default ThankyouScreen;
