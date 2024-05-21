import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Display alert for successful logout
    Alert.alert('Logout Successful', '', [
      { text: 'OK', onPress: () => {} } // Empty onPress to dismiss alert
    ]);

    // Navigate to login screen
    navigation.navigate('Login');
  };

  // Call handleLogout function when component renders
  React.useEffect(() => {
    handleLogout();
  }, []);

  // Return null as we don't want to render anything
  return null;
};

export default Logout;
