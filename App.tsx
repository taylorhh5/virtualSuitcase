//React
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
//Screens
import Home from './screens/Home';
import AddClothing from './screens/AddItemForm'
import LuggageStackNavigator from './Navigation/LuggageStackNavigator';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icons
import HomeIcon from './Icons/HomeIcon';
import PlusSignSVG from './Icons/PlusSignSVG';
import SuitcaseSVG from './Icons/SuitcaseSVG';

//colors
import colors from './themes/Colors';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  AddClothing: undefined;
  LuggageStackNavigator: undefined
};

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const isLoggedIn = true; // Replace this with your actual login status check

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
            component={AuthStackNavigator} // Replace with your actual Auth stack component
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;