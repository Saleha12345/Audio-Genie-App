import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OnboardingScreen from './components/FirstScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import HomePage from './components/HomePage';
import TermAndCondition from './components/TermAndCondition';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing';
import Payment from './components/Payment';
import {UserProvider} from './components/UserContext';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import Feedback from './components/Feedback';
import SubscriptionPlan from './components/SubscriptionPlan';
import AdminDashboard from './components/admin/AdminDashboard';
import Users from './components/admin/Users';
import Logout from './components/Logout';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Root() {
  return (
    <Drawer.Navigator initialRouteName="HomePage">
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Profile" component={EditProfile} />
      {/* <Stack.Screen name="Pricing" component={Pricing} /> */}
      <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Terms and Conditions" component={TermAndCondition} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Logout" component={Logout} />
     
    </Drawer.Navigator>
  );
}

function AdminRoot() {
  return (
    <Drawer.Navigator initialRouteName="AdminDashboard">
      <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnboardingScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Pricing" component={Pricing} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Homepage" component={HomePage} />
          <Stack.Screen name="Root" component={Root} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="AdminRoot" component={AdminRoot} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
