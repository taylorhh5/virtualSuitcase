// React
import React from 'react';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import InsideSuitcase from '../screens/InsideSuitcase';
import Suitcases from '../screens/Suitcases';
import Outfits from '../screens/Outfits';
import CreateOutfit from '../screens/Components/CreateOutfit';
import colors from '../themes/Colors';
import AddItemForm from '../screens/AddItemForm';

type LuggageStackParamList = {
  Suitcases: undefined;
  InsideSuitcase: { name: string };
  Outfits: undefined;
  CreateOutfit: undefined;
  AddItemForm: undefined
};

const LuggageStack = createNativeStackNavigator<LuggageStackParamList>();

function LuggageStackNavigator() {
  return (
    <LuggageStack.Navigator initialRouteName="Suitcases" screenOptions={{
      headerStyle: {
        backgroundColor: colors.dark,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <LuggageStack.Screen name="Suitcases" component={Suitcases} />
      <LuggageStack.Screen name="InsideSuitcase" component={InsideSuitcase} options={({ route }) => ({
        title: route.params.name,
      })}
      />
      <LuggageStack.Screen name="Outfits" component={Outfits} />
      <LuggageStack.Screen name="CreateOutfit" component={CreateOutfit} />
      <LuggageStack.Screen name="AddItemForm" component={AddItemForm} />



    </LuggageStack.Navigator>
  );
}

export default LuggageStackNavigator;
