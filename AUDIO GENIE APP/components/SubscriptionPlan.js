import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

// Assuming useUser is a custom hook to get and set user details
import { useUser } from './UserContext'; 

const SubscriptionScreen = () => {
  const [selectedSubscription, setSelectedSubscription] = useState('Basic');
  const [open, setOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState("");
  const [newSubscription, setNewSubscription] = useState("");
  const [isCancellationConfirmed, setIsCancellationConfirmed] = useState(false);
  const { signupDetails, setSignupDetails } = useUser();

  useEffect(() => {
    // Fetch current user subscription when component mounts
    fetchCurrentSubscription();
  }, []);

  const fetchCurrentSubscription = async () => {
    try {
      const { email } = signupDetails;
      console.log(email)

      const response = await axios.post(
        "http://10.113.71.69:3001/getsubscription",
        { email }
      );
      if (response.status === 200) {
        setCurrentSubscription(response.data);
      }
    } catch (error) {
      console.error("Error fetching current subscription:", error);
    }
  };

  const handleUpdatePlan = async () => {
    try {
      const { email } = signupDetails;

      const response = await fetch("http://10.113.71.69:3001/update-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, newPlan: selectedSubscription }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentSubscription(selectedSubscription);
        Alert.alert("Success", "Plan updated successfully!");
      } else {
        throw new Error("Failed to update plan");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      Alert.alert("Error", "Failed to update plan. Please try again.");
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const { email } = signupDetails;

      const response = await fetch("http://10.113.71.69:3001/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setCurrentSubscription("");
        Alert.alert("Success", "Subscription cancelled successfully!");
      } else {
        throw new Error("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      Alert.alert("Error", "Failed to cancel subscription! Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current subscription: {currentSubscription}</Text>

      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={[
          { label: 'Basic', value: 'Basic' },
          { label: 'Standard', value: 'Standard' },
          { label: 'Premium', value: 'Premium' },
        ]}
        value={selectedSubscription}
        setValue={setSelectedSubscription}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItemText}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
      />

      <TouchableOpacity
        style={[styles.actionButton, styles.updateButton]}
        onPress={handleUpdatePlan}
      >
        <Text style={styles.actionButtonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.cancelButton]}
        onPress={handleCancelSubscription}
      >
        <Text style={styles.actionButtonText}>Cancel Subscription</Text>
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
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownItemText: {
    backgroundColor: 'white',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#0040B5',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#0040B5',
  },
  cancelButton: {
    backgroundColor: '#FF0000',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
