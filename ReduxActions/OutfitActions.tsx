import { Dispatch } from 'redux';
import {
  ADD_OUTFIT,
  EDIT_OUTFIT,
  DELETE_OUTFIT,
  FETCH_OUTFITS_SUCCESS,
  FETCH_OUTFITS_FAILURE,
  FETCH_OUTFIT_BY_ID_SUCCESS,
  FETCH_OUTFIT_BY_ID_FAILURE,
} from './ActionTypes/OutfitTypes';
import { Outfit } from './ActionTypes/OutfitTypes';
import { db } from '../firebase'; 

export const addOutfit = (outfit: Outfit) => (dispatch: Dispatch) => {
  db.collection('outfits')
    .add(outfit)
    .then((addedOutfit) => {
      dispatch({ type: ADD_OUTFIT, payload: { id: addedOutfit.id, ...outfit } });
    })
    .catch((error) => {
      console.error('Error adding outfit:', error);
    });
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

export const fetchOutfits = () => (dispatch: Dispatch) => {
  db.collection('outfits')
    .get()
    .then((querySnapshot) => {
      const outfits: Outfit[] = [];
      querySnapshot.forEach((doc) => {
        outfits.push({ id: doc.id, ...doc.data() } as Outfit);
      });
      dispatch({ type: FETCH_OUTFITS_SUCCESS, payload: outfits });
    })
    .catch((error) => {
      console.error('Error fetching outfits:', error);
      dispatch({ type: FETCH_OUTFITS_FAILURE, payload: error });
    });
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
