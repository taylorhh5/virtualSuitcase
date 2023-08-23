import { Dispatch } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from './ActionTypes/AuthTypes';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import localDeviceStorage from '../utils/LocalDeviceStorage';

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

export const login = (
    email: string,
    password: string
) => (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_START });

    signInWithEmailAndPassword(
        form.email,
        form.password
    )
        .then((userCredential: UserCredential) => {
            const user = userCredential.user;
            dispatch({ type: LOGIN_SUCCESS, payload: user });

            localDeviceStorage.saveItem('token', user.accessToken);
            localDeviceStorage.saveItem('user_id', user.uid);
            localDeviceStorage.saveItem('email', user.email);
        })
        .catch((error: FirebaseError) => {
            dispatch({ type: LOGIN_FAILURE, payload: error });
            console.log(error.message, 'err here');
            Alert.alert(error.message);
        });
};
