import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useUser } from './UserContext';

const SubscriptionPage = ({ navigation }) => {
  const { signupDetails, setSignupDetails } = useUser();
  const { user, email, password } = signupDetails;
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [price, setPrice] = React.useState(null);

  const handleSubscription = (plan, price) => {
    setSelectedPlan(plan);
    setPrice(price);
    setSignupDetails({ ...signupDetails, plan: plan, price: price });
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Text style={styles.heading}>Select Subscription Plan</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Basic Plan</Text>
          <Text style={styles.price}>$9.99/month</Text>
          <Text style={styles.features}>- 5
            Audio File Uploads</Text>
          <Text style={styles.features}>- 10
            Audio Separation Requests</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleSubscription('Basic', '300')}>
            <Text style={styles.buttonText}>Select Plan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Standard Plan</Text>
          <Text style={styles.price}>$19.99/month</Text>
          <Text style={styles.features}>- Unlimited Audio File Uploads</Text>
          <Text style={styles.features}>-  50
            Audio Separation Requests per Month</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleSubscription('Standard', '900')}>
            <Text style={styles.buttonText}>Select Plan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Premium Plan</Text>
          <Text style={styles.price}>$29.99/month</Text>
          <Text style={styles.features}>- Unlimited Audio File Uploads</Text>
          <Text style={styles.features}>- 200 Audio Separation Requests</Text>

          <TouchableOpacity style={styles.button} onPress={() => handleSubscription('Premium', '3000')}>
            <Text style={styles.buttonText}>Select Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5FF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0040B5',
    marginHorizontal: 40,
    marginBottom: 20
  },
  logo: {
    width: 57,
    height: 55,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0040B5',
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0040B5',
  },
  features: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#0040B5',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubscriptionPage;
