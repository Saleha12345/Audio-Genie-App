import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useUser } from './UserContext'; 

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Quality Feedback', value: 'Quality' },
    { label: 'Report an Issue', value: 'Issue' },
    { label: 'Feature Request', value: 'FeatureRequest' },
  ]);
  const { theme, fontSize } = useUser();

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleFeedbackChange = text => {
    setFeedback(text);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://192.168.100.23:3001/submit-feedback',
        {
          category: value,
          rating,
          feedback,
        },
      );
      console.log(response.data);
      Alert.alert('Feedback submitted successfully!');

      setRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Failed to submit feedback. Please try again.');
    }
  };

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
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={styles.dropdownContainer}
        style={[styles.dropdown, { borderColor: theme === 'dark' ? '#666' : '#CCC' }]}
        itemStyle={styles.dropdownItemText}
        dropDownStyle={{ backgroundColor: theme === 'dark' ? '#444' : '#FFF' }}
      />

      <Rating
        startingValue={rating}
        imageSize={30}
        onFinishRating={handleRatingChange}
        style={styles.rating}
      />

      <TextInput
        style={[styles.feedbackInput, { color: getTextColor(), fontSize: getFontSizeValue(), borderColor: theme === 'dark' ? '#666' : '#CCC' }]}
        multiline
        value={feedback}
        onChangeText={handleFeedbackChange}
        placeholder="Enter your feedback..."
        placeholderTextColor={theme === 'dark' ? '#CCC' : '#888'}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  darkTheme: {
    backgroundColor: '#333',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownItemText: {
    backgroundColor: 'white',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  rating: {
    marginBottom: 30,
    marginTop: 20,
  },
  feedbackInput: {
    height: 100,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#0040B5',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Feedback;
