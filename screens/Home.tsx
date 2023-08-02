import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  AddClothing: undefined
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  
  const handleDemoPress = () => {
    navigation.navigate('AddClothing')
  };

  return (

    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Virtual Closet</Text>
        <Text style={styles.subtitle}>A place to plan, view, and organize your closet.</Text>
      </View>
      <TouchableOpacity onPress={handleDemoPress}>
        <Text style={styles.demoLink}>Check out the demo</Text>
      </TouchableOpacity>
      <Image
        style={styles.welcomeImage}
        source={{
          uri:
            'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#27c6db'
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
  },
  demoLink: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  welcomeImage: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
});

export default Home;
