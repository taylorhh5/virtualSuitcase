// React
import React from 'react';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import InsideSuitcase from '../screens/InsideSuitcase';
import Suitcases from '../screens/Suitcases';

type LuggageStackParamList = {
  Suitcases: undefined;
  InsideSuitcase: { userId: string };
};

const LuggageStack = createNativeStackNavigator<LuggageStackParamList>();

function LuggageStackNavigator() {
  return (
      <LuggageStack.Navigator initialRouteName="Suitcases">
        <LuggageStack.Screen name="Suitcases" component={Suitcases} options={{headerShown: false}}/>
        <LuggageStack.Screen name="InsideSuitcase" component={InsideSuitcase} />
      </LuggageStack.Navigator>
  );
}

export default LuggageStackNavigator;
