//React
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
//Screens
import Home from './screens/Home';
import AddClothing from './screens/AddClothing'
import Suitcases from './screens/Suitcases';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icons
import HomeIcon from './Icons/HomeIcon';

//colors
import colors from './themes/Colors';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  AddClothing: undefined
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Home navigation={navigation} />
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddClothing" component={AddClothing} />
      </Stack.Navigator> */}
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
          tabBarLabel: 'Home',tabBarIcon: ({ color, size }) => (
            <HomeIcon  />
          ),
          
        }} />
        <Tab.Screen name="AddClothing" component={AddClothing}/>
        <Tab.Screen name="Suitcases" component={Suitcases}  options={{
          tabBarLabel: 'Suitcases',tabBarIcon: ({ color, size }) => (
            <Image
                    source={require('./Icons/TravelerIcon.png')}
                    style={{ width: 40, height: 40 }} />
          ),
          
        }}/>

        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;