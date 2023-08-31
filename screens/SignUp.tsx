import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { register, login } from '../ReduxActions/AuthActions';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailStyle, setEmailStyle] = useState(styles.validInput);
  const [passwordStyle, setPasswordStyle] = useState(styles.validInput);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleSignUp = () => {
    if (!isEmailValid) {
      setEmailStyle(styles.invalidInput);
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!isPasswordValid) {
      setPasswordStyle(styles.invalidInput);
      Alert.alert(
        'Invalid Password',
        'Password must contain at least 6 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special symbol.'
      );
      return;
    }

    dispatch(register(email, password));
  };

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Icons/AppIcon1024.png')} style={styles.image} />
      <Text style={styles.header}>Welcome to Virtual Suitcase</Text>
      <TextInput
        style={[styles.input, emailStyle]}
        placeholder="Email"
        placeholderTextColor={'grey'}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailStyle(styles.validInput);
        }}
      />
      <TextInput
        style={[styles.input, passwordStyle, styles.bottomInput]}
        placeholder="Password"
        placeholderTextColor={'grey'}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordStyle(styles.validInput);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#95d2db',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight:'600'
  },
  
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 7,
  },
  validInput: {
    borderColor: 'black', 
  },
  invalidInput: {
    borderColor: '#FF6060', 
  },
  button: {
    backgroundColor: '#eb4f34', 
    width: '80%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 14,
  },
  loginButton: {
    backgroundColor: 'blue', 
  },
  bottomInput:{
    marginBottom:20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 350, 
    height: 300, 
    marginTop:'16%',
    marginRight:5
  },

});

export default SignUp;
