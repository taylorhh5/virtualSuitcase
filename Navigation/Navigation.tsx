//React
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
//Screens
import Home from '../screens/Home';
import AddItemForm from '../screens/AddItemForm';
import LuggageStackNavigator from './LuggageStackNavigator';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';


type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  AddItemForm: undefined;
  LuggageStackNavigator: undefined
};

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const isLoggedIn = true; 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="LuggageStack"
            component={LuggageStackNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStackNavigator} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;