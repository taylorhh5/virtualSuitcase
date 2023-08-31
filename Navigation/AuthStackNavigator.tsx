// React
import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import SignUp from '../screens/SignUp';
//Style
import colors from '../themes/Colors';

type AuthStackParamList = {
  SignUp: undefined;

};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="SignUp" screenOptions={{
      headerShown: false, 
    }}>
      <AuthStack.Screen name="SignUp" component={SignUp} />




    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
