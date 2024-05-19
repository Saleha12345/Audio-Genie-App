import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';


const windowWidth = Dimensions.get('window').width;

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = React.useState('');

  const handleEmailChange = (inputEmail) => {
    setEmail(inputEmail);
  };

  const handleResetPassword = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forget Password</Text>
      <Text style={styles.text1}>
        Please enter your email to receive a link to create a new password
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5FF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#0040B5',
    marginLeft: 30,
    marginTop: 50,
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
    marginTop:10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '85%',
    marginHorizontal: 30,
  },
  text1: {
    color: '#000000',
    marginTop: 20,
    marginHorizontal: 30,
  },
});

export default ForgetPassword;