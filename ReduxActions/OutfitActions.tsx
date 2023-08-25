import { Dispatch } from 'redux';
import {
  ADD_OUTFIT,
  EDIT_OUTFIT,
  DELETE_OUTFIT,
  FETCH_OUTFITS_SUCCESS,
  FETCH_OUTFITS_FAILURE,
  FETCH_OUTFIT_BY_ID_SUCCESS,
  FETCH_OUTFIT_BY_ID_FAILURE,
  FETCH_OUTFITS_START
} from './ActionTypes/OutfitTypes';
import { Outfit } from './ActionTypes/OutfitTypes';
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase/config';
export const addOutfit = (outfit: Outfit) => (dispatch: Dispatch) => {
  // db.collection('outfits')
  //   .add(outfit)
  //   .then((addedOutfit) => {
  //     dispatch({ type: ADD_OUTFIT, payload: { id: addedOutfit.id, ...outfit } });
  //   })
  //   .catch((error) => {
  //     console.error('Error adding outfit:', error);
  //   });
  console.log('Outfit added', outfit)
};

export const editOutfit = (id: string, updatedOutfit: Partial<Outfit>) => (dispatch: Dispatch) => {
  db.collection('outfits')
    .doc(id)
    .update(updatedOutfit)
    .then(() => {
      dispatch({ type: EDIT_OUTFIT, payload: { id, updatedData: updatedOutfit } });
    })
    .catch((error) => {
      console.error('Error editing outfit:', error);
    });
};

export const deleteOutfit = (id: string) => (dispatch: Dispatch) => {
  db.collection('outfits')
    .doc(id)
    .delete()
    .then(() => {
      dispatch({ type: DELETE_OUTFIT, payload: id });
    })
    .catch((error) => {
      console.error('Error deleting outfit:', error);
    });
};


export const fetchOutfits = () => {
  return (dispatch: Dispatch) => { 
    console.log('fetching luggage items');
    dispatch({ type: FETCH_OUTFITS_START });

    const outfitsRef = query(collection(db, 'outfits'));
    // const outfitsRef = query(collection(db, 'outfits'), where('userId', '==', '123'));
    onSnapshot(
      outfitsRef,
      snapshot => {
        const outfits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(outfits, 'outfits data')
        dispatch({ type: FETCH_OUTFITS_SUCCESS, payload: outfits });
      },
      error => {
        console.error('Error fetching outfits:', error); 
        dispatch({ type: FETCH_OUTFITS_FAILURE, payload: error });
      }
    );
  };
};


export const fetchOutfitById = (outfitId: string) => (dispatch: Dispatch) => {
  db.collection('outfits')
    .doc(outfitId)
    .get()
    .then((outfitDoc) => {
      if (outfitDoc.exists) {
        const outfitData = outfitDoc.data() as Outfit;
        dispatch({ type: FETCH_OUTFIT_BY_ID_SUCCESS, payload: { id: outfitDoc.id, ...outfitData } });
      } else {
        dispatch({ type: FETCH_OUTFIT_BY_ID_FAILURE, payload: new Error('Outfit not found') });
      }
    })
    .catch((error) => {
      console.error('Error fetching outfit by ID:', error);
      dispatch({ type: FETCH_OUTFIT_BY_ID_FAILURE, payload: error });
    });
};
