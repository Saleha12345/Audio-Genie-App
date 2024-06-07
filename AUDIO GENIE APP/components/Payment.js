import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useUser } from './UserContext';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';

const Stack = createStackNavigator();

const PaymentPage = ({ navigation }) => {
  const { signupDetails } = useUser();
  const { username, email, password, country, plan, price } = signupDetails;
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async (e) => {
    if (cardNumber.length !== 16) {
      setError('Card number must be 16 digits');
      return;
    }
    const currentDate = new Date();
    const [expiryMonth, expiryYear] = expiryDate.split('/');
    const expiry = new Date(`20${expiryYear}`, expiryMonth - 1);
    if (expiry < currentDate) {
      setError('Expiry date cannot be in the past');
      return;
    }

    const paymentData = {
      username,
      email,
      password,
      country,
      plan,
      price,
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv
    };

    console.log(paymentData);
    try {
      const response = await fetch('http://192.168.100.23:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      console.log("hello")
      console.log(response)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigation.navigate('Root');
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate('Pricing') }} style={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} color="#0040B5" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.heading}>Enter Card Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Card Holder Name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />

          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />

            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Make Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: '#F9F5FF',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  formContainer: {
    width: '90%',
  },
  form: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 5,
    padding: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0040B5',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#0040B5',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default PaymentPage;
