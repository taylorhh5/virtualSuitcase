// React
import React from 'react';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import InsideSuitcase from '../screens/InsideSuitcase';
import Suitcases from '../screens/Suitcases';
import Outfits from '../screens/Outfits';


type LuggageStackParamList = {
  Suitcases: undefined;
  InsideSuitcase: { userId: string };
  Outfits: undefined
};

const LuggageStack = createNativeStackNavigator<LuggageStackParamList>();

function LuggageStackNavigator() {
  return (
      <LuggageStack.Navigator initialRouteName="Suitcases">
        <LuggageStack.Screen name="Suitcases" component={Suitcases} options={{headerShown: false}}/>
        <LuggageStack.Screen name="InsideSuitcase" component={InsideSuitcase} options={{headerShown: false}} />
        <LuggageStack.Screen name="Outfits" component={Outfits} options={{headerShown: false}} />

      </LuggageStack.Navigator>
  );
}

export default LuggageStackNavigator;
