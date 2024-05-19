import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View,Text,StyleSheet,ScrollView,ImageBackground,TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function TermAndCondition() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
       {/* <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={() => navigation.navigate('Profile')}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms and Conditions</Text>
      </View> */}

      <ImageBackground
        source={require('../images/Term.jpg')}
        style={styles.headerContainer1}>
      </ImageBackground>

      <View>
      </View>
      
      <View style={styles.contentContainer}>
        
      
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.content}>
          
Welcome to AudioGenie! Our mission is to revolutionize the way you experience audio content. These Terms and Conditions ("Terms") delineate the rules and regulations governing your utilization of the AudioGenie mobile application ("App") and the array of services it offers, all provided by AudioGenie Ltd. ("AudioGenie," "we," or "us"). By accessing and using the App, you are expressly agreeing to adhere to these Terms. We strongly urge you to peruse them meticulously prior to engaging with the App.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>1. User Responsibilities</Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>1.1. Eligibility:</Text> By using the
          App, you confirm that you are at least 18 years old and have the legal
          capacity to enter into a binding agreement. If you are using the App
          on behalf of a business, you represent and warrant that you have the
          necessary authority to bind that business to these Terms.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>1.2. Account Information:</Text> 
1.2. Account Information: Your account integrity is paramount. You are entrusted with the responsibility of safeguarding the confidentiality of your account details, comprising your username and password. It is imperative that you furnish precise, comprehensive, and current information during the registration process. Additionally, you commit to promptly updating any modifications to your account particulars, ensuring the accuracy and relevancy of your account details at all times.






        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>1.3. Prohibited Conduct:</Text> Maintaining the integrity of the AudioGenie community is paramount. You expressly agree not to employ the App for any unlawful, fraudulent, or unauthorized endeavors. Any activities that may jeopardize the functionality of the App or impede the experience of fellow users are strictly prohibited. Your commitment to fostering a safe and enriching environment within the AudioGenie community is essential.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>2. Audio Genie</Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>2.1. Partners:</Text> AudioGenie serves as a vital intermediary platform, seamlessly connecting users with a diverse array of audio content partners. While we diligently endeavor to provide accurate information, it's important to note that we do not guarantee the availability, quality, or accuracy of the content provided by our partners. AudioGenie assumes no responsibility for any issues that may arise from the creation, production, or delivery of the audio content by our partners.







        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>2.2. Subscription Modifications:</Text> Once a subscription is confirmed through the AudioGenie App, it may not be canceled or modified. Should you encounter any concerns or issues with your subscription, we encourage you to directly communicate with our support team for assistance and resolution.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>2.3. Payments:</Text> By utilizing the AudioGenie platform, you consent to the payment terms outlined during the checkout process. This includes the total amount comprising the subscription fee, applicable taxes, and any disclosed additional charges. Rest assured, all payments are securely processed through trusted third-party payment gateways, ensuring the confidentiality of your financial information. AudioGenie upholds a strict policy of not retaining any of your payment details for added security and peace of mind.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>3. Intellectual Property</Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>3.1. App Ownership:</Text> AudioGenie maintains full ownership rights, including all content, trademarks, logos, and associated intellectual property within the App. It is imperative that you refrain from any unauthorized use, reproduction, modification, or distribution of these materials without obtaining our prior written consent. Respect for our intellectual property safeguards the integrity and innovation of the AudioGenie platform.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>3.2. User Content:</Text>By submitting any content through the AudioGenie App, including reviews or ratings, you hereby grant AudioGenie a non-exclusive, royalty-free, worldwide license. This license permits AudioGenie to utilize, reproduce, modify, adapt, and display such content with the intention of enhancing and promoting our services. Your contributions play a crucial role in enriching the AudioGenie experience for all users.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>4. Privacy</Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>4.1. Data Collection:</Text> AudioGenie
          collects and processes personal data in accordance with our Privacy
          Policy. By using the App, you consent to the collection, use, and
          sharing of your personal information as described in the Privacy
          Policy.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>5.1. Disclaimer:</Text> The App and its
          services are provided on an "as is" and "as available" basis. AudioGenie
          does not warrant that the App will be error-free, uninterrupted, or
          free of viruses or other harmful components. We are not responsible
          for any damages, losses, or liabilities arising from your use of the
          App or reliance on any information provided.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.heading}>5.2. Indemnification:</Text> By using the AudioGenie App, you agree to indemnify and hold AudioGenie, its officers, directors, employees, and affiliates harmless. This includes any claims, damages, liabilities, or expenses incurred as a result of your breach of these Terms or your use of the App. Your commitment to indemnify safeguards AudioGenie and its stakeholders against any potential legal ramifications arising from your actions or use of the platform.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backArrowContainer: {
    marginRight: 16,
  },
  headerContainer1: {
    width: '100%',
    height: 270,
    justifyContent: 'flex-end',
    opacity: 0.8,
   
  },
  headerContainer: {
    backgroundColor: '#ED6474',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',

  },
  backArrow: {
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  heading: {
    fontWeight: 'bold',
  },
});