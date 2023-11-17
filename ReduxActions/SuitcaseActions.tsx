import { Dispatch } from 'redux';
import {
  ADD_SUITCASE,
  EDIT_SUITCASE,
  DELETE_SUITCASE,
  FETCH_SUITCASES_SUCCESS,
  FETCH_SUITCASES_FAILURE,
  FETCH_SUITCASE_BY_ID_SUCCESS,
  FETCH_SUITCASE_BY_ID_FAILURE,
  FETCH_SUITCASES_START
} from './/ActionTypes/SuitcaseActionTypes';
//firebase
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc, getDoc, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config';
import Toast from 'react-native-toast-message';

export const addSuitcase = (name: string, userId: string) => {
  return (dispatch: Dispatch) => {
    // dispatch({ type: ADD_SUITCASE_START });
    addDoc(collection(db, 'suitcases'), {
      name: name,
      userId: userId,
      timestamp: new Date(),
    })
      .then((suitcaseDocRef) => {
        dispatch({ type: ADD_SUITCASE, payload: suitcaseDocRef.id });
        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "success",
          text1: "Suitcase added ✨",
        });
      })
      .catch((error) => {
        console.error('Error adding suitcase:', error);
        // dispatch({ type: ADD_SUITCASE_FAILURE, payload: error });
        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "error",
          text1: "Error. Please try again.",
        });
      });
  };
};

export const editSuitcaseName = (suitcaseId: string, newName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      // dispatch({ type: EDIT_SUITCASE_NAME_START });
      await updateDoc(doc(db, 'suitcases', suitcaseId), {
        name: newName,
      });

      dispatch({ type: EDIT_SUITCASE, payload: { id: suitcaseId, newName } });
      Toast.show({
        visibilityTime: 2000,
        autoHide: true,
        type: "success",
        text1: "Suitcase edited 👍",
      });
    } catch (error) {
      console.error('Error editing suitcase name:', error);
      // dispatch({ type: EDIT_SUITCASE_NAME_FAILURE, payload: error });
      Toast.show({
        visibilityTime: 2000,
        autoHide: true,
        type: "error",
        text1: "Error. Please try again.",
      });
    }
  };
};

export const deleteSuitcase = (suitcaseId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      // dispatch({ type: DELETE_SUITCASE_START });
      await deleteDoc(doc(db, 'suitcases', suitcaseId));
      dispatch({ type: DELETE_SUITCASE, payload: suitcaseId });
      Toast.show({
        visibilityTime: 2000,
        autoHide: true,
        type: "success",
        text1: "Suitcase deleted ❌",
      });
    } catch (error) {
      console.error('Error deleting suitcase:', error);
      // dispatch({ type: DELETE_SUITCASE_FAILURE, payload: error });
      Toast.show({
        visibilityTime: 2000,
        autoHide: true,
        type: "error",
        text1: "Error. Please try again.",
      });
    }
  };
};

export const fetchSuitcases = (userId: string) => {
  return (dispatch: Dispatch) => {
    console.log('fetching suitcases');
    dispatch({ type: FETCH_SUITCASES_START });

    const suitcasesRef = query(collection(db, 'suitcases'), where('userId', '==', userId), orderBy('timestamp', 'desc'));

    onSnapshot(
      suitcasesRef,
      snapshot => {
        const suitcases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: FETCH_SUITCASES_SUCCESS, payload: suitcases });
      },
      error => {
        console.error('Error fetching suitcases:', error);
        dispatch({ type: FETCH_SUITCASES_FAILURE, payload: error });
      }
    );
  };
};

export const fetchSuitcaseById = (suitcaseId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      // dispatch({ type: FETCH_SUITCASE_BY_ID_START });

      const suitcaseDocRef = doc(db, 'suitcases', suitcaseId);
      const suitcaseDoc = await getDoc(suitcaseDocRef);

      if (suitcaseDoc.exists()) {
        const suitcaseData = suitcaseDoc.data();
        dispatch({ type: FETCH_SUITCASE_BY_ID_SUCCESS, payload: suitcaseData });
      } else {
        dispatch({ type: FETCH_SUITCASE_BY_ID_FAILURE, payload: 'Suitcase not found' });
      }
    } catch (error) {
      console.error('Error fetching suitcase by ID:', error);
      dispatch({ type: FETCH_SUITCASE_BY_ID_FAILURE, payload: error });
    }
  };
};

