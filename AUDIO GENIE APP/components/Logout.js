import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout Successful', '', [
      { text: 'OK', onPress: () => {} } 
    ]);
    navigation.navigate('Login');
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;
