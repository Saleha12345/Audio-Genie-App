import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { useUser } from './UserContext';

const windowWidth = Dimensions.get('window').width;

const Login = ({ navigation }) => {
  const { setSignupDetails } = useUser();
  const [user, setUser] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleUser = (inputText) => {
    setUser(inputText);
  };

  const handleEmail = (inputText) => {
    setEmail(inputText);
  };

  const handlePasswordChange = (inputPassword) => {
    setPassword(inputPassword);
  };

  const handleCountry = (inputText) => {
    setCountry(inputText);
  };

  const handleSignUp = () => {
    if (!user || !email || !password || !country) {
      setError('All fields are required');
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
    setSignupDetails({ user, email, password, country });
    navigation.navigate('Pricing');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>Create your account</Text>
        <TextInput
          style={styles.input1}
          placeholder="Username"
          onChangeText={handleUser}
          value={user}
        />

        <TextInput
          style={styles.input2}
          placeholder="Email"
          onChangeText={handleEmail}
          value={email}
        />

        <TextInput
          style={styles.input2}
          placeholder="Password"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input2}
          placeholder="Country"
          onChangeText={handleCountry}
          value={country}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  form: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#0040B5',
  },
  button: {
    width: '85%',
    backgroundColor: '#0040B5',
    paddingVertical: 15,
    marginHorizontal: 30,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input1: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '85%',
    marginTop: 30,
    marginHorizontal: 30,
  },
  input2: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '85%',
    marginHorizontal: 30,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
