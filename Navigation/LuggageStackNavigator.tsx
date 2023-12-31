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
import SettingsScreen from '../screens/SettingsScreen';
import AddItemsOptions from '../screens/AddItemsOptions';

export type LuggageStackParamList = {
  Suitcases: undefined;
  InsideSuitcase: { name: string };
  Outfits: undefined;
  CreateOutfit: {
    selectedOutfitItems: string[];
    edit: boolean; 
  };  AddItemForm: undefined;
  OutfitBox: undefined,
  SettingsScreen: undefined
  AddItemsOptions: undefined
  Home: undefined;
};

const LuggageStack = createNativeStackNavigator<LuggageStackParamList>();

function LuggageStackNavigator() {
  return (
    <LuggageStack.Navigator initialRouteName="Suitcases" screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: '#262626',
      headerShadowVisible: false,
      headerTitleStyle: {
      fontSize:23      
        
      },
    }}>
      <LuggageStack.Screen name="Suitcases" component={Suitcases} />
      <LuggageStack.Screen name="InsideSuitcase" component={InsideSuitcase} options={({ route }) => ({
        title: route.params.name,
      })}
      />
      <LuggageStack.Screen name="Outfits" component={Outfits} />
      <LuggageStack.Screen name="CreateOutfit" component={CreateOutfit} options={{ headerTitle: 'Create Outfit', headerBackTitle:'Back' }}/>
      <LuggageStack.Screen name="AddItemForm" component={AddItemForm} options={{ headerTitle: 'Add Item', headerBackTitle:'Back' }} />
      <LuggageStack.Screen name="SettingsScreen" component={SettingsScreen}  options={{ headerTitle: 'Settings', headerBackTitle:'Back' }} />
      <LuggageStack.Screen name="AddItemsOptions" component={AddItemsOptions} options={{ headerTitle: 'Add Item', headerBackTitle:'Back' }} />


    </LuggageStack.Navigator>
  );
}

export default LuggageStackNavigator;
