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
import { Suitcase } from './/ActionTypes/SuitcaseActionTypes';
//firebase
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config';

export const addSuitcase = (suitcase: Suitcase) => (dispatch: Dispatch) => {
  console.log('add')
    // .then((addedSuitcase) => {
      dispatch({ type: ADD_SUITCASE, payload: { ...suitcase } });
    // })
    // .catch((error) => {
    //   console.error('Error adding suitcase:', error);
    // });
  // .log('Add suitcase in action', suitcase)
};

export const editSuitcase = (id: string, updatedSuitcase: Partial<Suitcase>) => (dispatch: Dispatch) => {
  db.collection('suitcases')
    .doc(id)
    .update(updatedSuitcase)
    .then(() => {
      dispatch({ type: EDIT_SUITCASE, payload: { id, updatedData: updatedSuitcase } });
    })
    .catch((error) => {
      console.error('Error editing suitcase:', error);
    });
};

export const deleteSuitcase = (id: string) => (dispatch: Dispatch) => {
  db.collection('suitcases')
    .doc(id)
    .delete()
    .then(() => {
      dispatch({ type: DELETE_SUITCASE, payload: id });
    })
    .catch((error) => {
      console.error('Error deleting suitcase:', error);
    });
};


export const fetchSuitcases = () => {
  return (dispatch: Dispatch) => { 
    console.log('fetching suitcases');
    dispatch({ type: FETCH_SUITCASES_START });

    const suitcasesRef = query(collection(db, 'suitcases'));

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

export const fetchSuitcaseById = (suitcaseId: string) => (dispatch: Dispatch) => {
  db.collection('suitcases')
    .doc(suitcaseId)
    .get()
    .then((suitcaseDoc) => {
      if (suitcaseDoc.exists) {
        const suitcaseData = suitcaseDoc.data() as Suitcase;
        dispatch({ type: FETCH_SUITCASE_BY_ID_SUCCESS, payload: { id: suitcaseDoc.id, ...suitcaseData } });
      } else {
        dispatch({ type: FETCH_SUITCASE_BY_ID_FAILURE, payload: new Error('Suitcase not found') });
      }
    })
    .catch((error) => {
      console.error('Error fetching suitcase by ID:', error);
      dispatch({ type: FETCH_SUITCASE_BY_ID_FAILURE, payload: error });
    });
};
