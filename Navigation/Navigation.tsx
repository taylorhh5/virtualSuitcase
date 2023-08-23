//React
import * as React from 'react';
//Screens
import LuggageStackNavigator from './LuggageStackNavigator';
import { useSelector } from 'react-redux';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import { RootState } from '../Reducers/RootReducer';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


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
            options={{ headerShown: false }}

          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;