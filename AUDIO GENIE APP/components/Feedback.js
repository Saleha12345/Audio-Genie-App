import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';

const Feedback = () => {
 
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleFeedbackChange = text => {
    setFeedback(text);
  };

  const [items, setItems] = useState([
    { label: 'Quality Feedback', value: 'Quality' },
    { label: 'Report an Issue', value: 'Issue' },
    { label: 'Feature Request', value: 'FeatureRequest' },
  ]);

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

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Feedback</Text> */}

      
      {/* Dropdown for selecting the category */}
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />

      {/* Star rating component for rating the quality */}
      <Rating
        startingValue={rating}
        imageSize={30}
        onFinishRating={handleRatingChange}
        style={styles.rating}
      />

      {/* Text input for entering feedback */}
      <TextInput
        style={styles.feedbackInput}
        multiline
        value={feedback}
        onChangeText={handleFeedbackChange}
        placeholder="Enter your feedback..."
      />

      {/* Submit button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.8} // Controls the opacity of the button when pressed
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
  header: {
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 24,
  },
  
  dropdownContainer: {
    marginBottom: 20,
  },
  
  dropdownItemText: {
    backgroundColor:'white',
   
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
   
  },
  rating: {
    marginBottom: 30,
    marginTop:20
  },
  feedbackInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#ccc',
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
