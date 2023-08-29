import { Dispatch } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from './ActionTypes/AuthTypes';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import localDeviceStorage from '../utils/LocalDeviceStorage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase/config';
import clearStorage from '../utils/ClearStorage';

interface FirebaseError {
    code: string;
    message: string;
}

interface UserCredential {
    user: any;
}


export const register = (
    email: string,
    password: string
) => (dispatch: Dispatch) => {
    dispatch({ type: REGISTER_START });

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
            const user = userCredential.user;
            dispatch({ type: REGISTER_SUCCESS, payload: user });

            localDeviceStorage.saveItem('token', user.accessToken);
            localDeviceStorage.saveItem('user_id', user.uid);
            localDeviceStorage.saveItem('email', user.email);
        })
        .catch((error: FirebaseError) => {
            dispatch({ type: REGISTER_FAILURE, payload: error });
            Alert.alert(error.message);
        });
};

export const login = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_START });
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        dispatch({ type: LOGIN_SUCCESS, payload: user });
  
        localDeviceStorage.saveItem('token', user.accessToken);
        localDeviceStorage.saveItem('user_id', user.uid);
        localDeviceStorage.saveItem('email', user.email);
      })
      .catch((error: FirebaseError) => {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        Alert.alert(error.message);
      });
  };

  export const logout = () => (dispatch: Dispatch) => {
    signOut(auth)
      .then(() => {
        clearStorage()
        console.log('User signed out')
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((error) => {
        console.log('Error logging out')
        dispatch({ type: LOGOUT_FAILURE, payload: error });
      });
  };
