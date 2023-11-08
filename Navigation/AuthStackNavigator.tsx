// React
import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Demo from '../screens/Demo';

type AuthStackParamList = {
  WelcomeScreen: undefined;
  SignUp: undefined;
  Login: undefined;
  Demo: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="WelcomeScreen" screenOptions={{
      headerShown: false,
    }}>
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Demo" component={Demo} />

    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
