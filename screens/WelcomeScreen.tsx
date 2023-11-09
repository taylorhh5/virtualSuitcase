import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Demo from './Demo';

const WelcomeScreen: React.FC = ({navigation}) => {
    const [demo, setDemo] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('SignUp');

  };

  const handleLogin = () => {
    navigation.navigate('Login');

  };

  const handleDemo = () => {
    navigation.navigate('Demo');

  };

  const showDemo = () => {
    setDemo(true);
  };

  if (demo) {
    return (
      <Demo setDemo={setDemo} />
    )
  }

  return (
    <View style={styles.container}>
            <View style={{height:'93%', }}><Demo/></View>

      {/* <Image source={require('../Icons/AppIcon1024.png')} style={styles.image} /> */}
      {/* <Text style={styles.header}>Welcome to Virtual Suitcase</Text> */}
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',}}>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.demoButton} onPress={handleDemo}>
        <Text style={styles.buttonText}>Watch Demo</Text>
      </TouchableOpacity> */}
    </View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: '#95d2db',
    // paddingTop: 20,
    paddingBottom:'8%'
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#eb4f34',
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 14,
  },
  loginButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 350,
    height: 300,
    marginTop: '16%',
    marginRight: 5,
  },
  demoButton:{
    backgroundColor: 'gold',
    width: '80%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 14,  },
});

export default WelcomeScreen;
