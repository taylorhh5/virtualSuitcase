//React
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
//Screens
import Home from './screens/Home';
import AddClothing from './screens/AddClothing'
import Suitcases from './screens/Suitcases';
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
  AddClothing: undefined
};

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#E9B384',
          tabBarInactiveTintColor: '#F3EADA',
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.dark,
          },

        })}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (
            <HomeIcon style={{ width: 46, height: 46 }} />
          ),

        }} />
        <Tab.Screen name="AddClothing" component={AddClothing}
          options={{
            tabBarLabel: 'Add', tabBarIcon: ({ color, size }) => (
              <PlusSignSVG style={{ width: 30, height: 30, marginTop: 2 }} />
            ),

          }} />
        <Tab.Screen name="Suitcases" component={LuggageStackNavigator}
          options={{
            tabBarLabel: 'Suitcases', tabBarIcon: ({ color, size }) => (
              <SuitcaseSVG style={{ width: 40, height: 40, marginTop: 2 }} />
            ),

          }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;