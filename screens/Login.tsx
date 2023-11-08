import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../ReduxActions/AuthActions';
import { RootState } from '../Reducers/RootReducer';
import { NavigationProp } from '@react-navigation/native';

interface LoginProps {
    navigation: NavigationProp<any>;
  }

  const Login: React.FC<LoginProps> = ({ navigation }) => {
    const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailStyle, setEmailStyle] = useState(styles.validInput);
  const [passwordStyle, setPasswordStyle] = useState(styles.validInput);

  const navigateToWelcome = () => {
    navigation.navigate('WelcomeScreen');
  };

  const handleLogin = (): void => {
    if (email === '' || password === '') {
      Alert.alert('Invalid Input', 'Please enter both email and password.');
      return;
    }
    dispatch(login(email, password));
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image source={require('../Icons/AppIcon1024.png')} style={styles.image} />
        {!loading ?
          <Text style={styles.header}>Welcome to Virtual Suitcase</Text>
          :
          <Text style={styles.header}>Logging in...</Text>
        }
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
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToWelcome}>
          <Text style={styles.buttonText}>Back To Welcome Screen</Text>
        </TouchableOpacity>
    
      </View>
    </TouchableWithoutFeedback>
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
    fontWeight: '600',
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
    backgroundColor: 'green',
  },
  bottomInput: {
    marginBottom: 20,
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
});

export default Login;
