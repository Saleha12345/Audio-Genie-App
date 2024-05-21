import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import axios from 'axios';

const EditProfile = () => {
  const navigation = useNavigation();
  const { signupDetails, setSignupDetails, theme, fontSize } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingNewPassword, setIsEditingNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [username, setUsername] = useState(signupDetails.username);
  const [email, setEmail] = useState(signupDetails.email);
  const [password, setPassword] = useState(signupDetails.password);
  const [newPassword, setNewPassword] = useState('');
  const [changesMade, setChangesMade] = useState(false);

  const handleSaveChanges = async () => {
    try {
      const updatedFields = {};
      if (!changesMade) {
        Alert.alert('Warning', 'No changes made.');
        return;
      }

      if (isEditingName) updatedFields.username = username;
      if (isEditingEmail) updatedFields.email = email;
      if (isEditingNewPassword) updatedFields.newPassword = newPassword;

      const response = await axios.post('http://192.168.100.23:3001/update', updatedFields);
      Alert.alert('Success', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleEditName = () => setIsEditingName(true);
  const handleSaveName = () => {
    if (username.trim() !== '') {
      setIsEditingName(false);
      setSignupDetails({ ...signupDetails, username });
      setChangesMade(true);
    } else {
      Alert.alert('Error', 'Please provide a valid name.');
    }
  };

  const handleEditEmail = () => setIsEditingEmail(true);
  const handleSaveEmail = () => {
    if (email.trim() !== '') {
      setIsEditingEmail(false);
      setSignupDetails({ ...signupDetails, email });
      setChangesMade(true);
    } else {
      Alert.alert('Error', 'Please provide a valid email.');
    }
  };

  const handleEditPassword = () => setIsEditingPassword(true);
  const handleSavePassword = () => {
    if (password.trim() !== '') {
      setIsEditingPassword(false);
      setSignupDetails({ ...signupDetails, password });
      setChangesMade(true);
    } else {
      Alert.alert('Error', 'Please provide a valid password.');
    }
  };

  const handleEditNewPassword = () => setIsEditingNewPassword(true);
  const handleSaveNewPassword = () => {
    if (newPassword.trim() !== '') {
      setIsEditingNewPassword(false);
      setChangesMade(true);
    } else {
      Alert.alert('Error', 'Please provide a valid new password.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);

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
    <View style={[styles.container, theme === 'dark' && styles.darkTheme]}>
      <View style={styles.content}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.sectionLabel, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Name</Text>
          <TouchableOpacity onPress={handleEditName}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: getTextColor(), fontSize: getFontSizeValue() }]}
                value={username}
                onChangeText={(value) => {
                  setUsername(value);
                  setChangesMade(true);
                }}
                editable={isEditingName}
                placeholder="Enter your name"
                placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.sectionLabel, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Email</Text>
          <TouchableOpacity onPress={handleEditEmail}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: getTextColor(), fontSize: getFontSizeValue() }]}
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setChangesMade(true);
                }}
                editable={isEditingEmail}
                placeholder="Enter your email"
                placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.sectionLabel, { color: getTextColor(), fontSize: getFontSizeValue() }]}>Password</Text>
          <TouchableOpacity onPress={handleEditPassword}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: getTextColor(), fontSize: getFontSizeValue() }]}
                value={password}
                onChangeText={setPassword}
                editable={isEditingPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.sectionLabel, { color: getTextColor(), fontSize: getFontSizeValue() }]}>New Password</Text>
          <TouchableOpacity onPress={handleEditNewPassword}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: getTextColor(), fontSize: getFontSizeValue() }]}
                value={newPassword}
                onChangeText={setNewPassword}
                editable={isEditingNewPassword}
                secureTextEntry={!showNewPassword}
                placeholder="Enter your new password"
                placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveChanges} disabled={!changesMade} style={{backgroundColor:'white', borderRadius:10, width: 200, marginHorizontal:60, marginTop:30}}>
            <Text style={[styles.saveButton, !changesMade && { opacity: 0.5 }]}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  darkTheme: {
    backgroundColor: '#333',
  },
  content: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0040B5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#0040B5',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  saveButton: {
    fontSize: 16,
    color: '#0040B5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  
  },
});

export default EditProfile;
