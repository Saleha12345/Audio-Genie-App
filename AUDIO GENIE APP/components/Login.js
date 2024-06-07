import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  var { signupDetails, setSignupDetails } = useUser();

  const handleEmailChange = (inputEmail) => {
    setEmail(inputEmail);
  };

  const handlePasswordChange = (inputPassword) => {
    setPassword(inputPassword);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (email === 'admin@gmail.com' && password === 'admin1234') {
        navigation.navigate('AdminRoot');
      } else {
        console.log('Attempting login with:', email, password);
        const response = await axios.post('http://192.168.100.23:3001/login', {
          email,
          password,
        });
        console.log('Login response:', response.data);
        const userData = response.data.userData;
        setSignupDetails(userData);
        setLoginSuccess(true);
        navigation.navigate('Root');
      }
    } catch (error) {
      console.error('Login error:', error); // Log the entire error object
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        if (error.response.status === 403) {
          alert('Your account is suspended. Please contact support for assistance.');
        } else if (error.response.status === 401) {
          alert('Incorrect password. Please try again.');
        } else {
          setError('Invalid email or password');
        }
      } else {
        console.error('Error without response:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            color={'gray'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forget}>Forget Password?</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.text2}>
          Create a new Account?
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.sign}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
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
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: '#0040B5',
    textAlign: 'center',
  },
  button: {
    width: "85%",
    marginBottom: 20,
    backgroundColor: '#0040B5',
    paddingVertical: 15,
    marginHorizontal: 30,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '85%',
    marginHorizontal: 30,
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0040B5',
    textAlign: 'center',
  },
  sign: {
    color: '#0040B5',
    textDecorationLine: 'underline',
  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 17,
  },
  forget: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default Login;
