// itemActions.ts
import { Dispatch } from 'redux';
import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_LUGGAGE_ITEMS_SUCCESS, FETCH_LUGGAGE_ITEMS_FAILURE, FETCH_LUGGAGE_ITEMS_START } from './ActionTypes/LuggageActionTypes';
import { Item } from './ActionTypes/LuggageActionTypes';
//firebase
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase/config';



export const fetchItemsInSuitcase = (suitcaseId) => {
  return (dispatch: Dispatch) => {
    console.log('fetching luggage items');
    dispatch({ type: FETCH_LUGGAGE_ITEMS_START });

    const luggageItemsRef = query(
      collection(db, 'luggageItems'),
      where('suitcaseId', '==', suitcaseId)  
    );

    onSnapshot(
      luggageItemsRef,
      snapshot => {
        const luggageItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: FETCH_LUGGAGE_ITEMS_SUCCESS, payload: luggageItems });
      },
      error => {
        console.error('Error fetching luggageItems:', error); 
        dispatch({ type: FETCH_LUGGAGE_ITEMS_FAILURE, payload: error });
      }
    );
  };
};
  export const getLuggageItemById = (id: string) => {
    return (dispatch: Dispatch) => {
      console.log('getting luggage item by ID', id);
      dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_START });
  
      const luggageItemsRef = query(collection(db, 'luggageItems'));
      const luggageItemRef = luggageItemsRef.doc(id);
  
      onSnapshot(
        luggageItemRef,
        snapshot => {
          if (snapshot.exists) {
            const luggageItem = snapshot.data();
            dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_SUCCESS, payload: luggageItem });
          } else {
            dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_FAILURE, payload: 'Luggage item not found' });
          }
        },
        error => {
          console.error('Error fetching luggage item by ID:', error);
          dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_FAILURE, payload: error });
        }
      );
    };
  };
  

export const addItem = (item: Item) => (dispatch: Dispatch) => {
    // db.collection('items')
    //   .add(item)
    //   .then((addedItem) => {
    //     dispatch({ type: ADD_ITEM, payload: { id: addedItem.id, ...item } });
    //   })
    //   .catch((error) => {
    //     console.error('Error adding item:', error);
    //   });
    console.log('Added', item)

  };
  
  export const editItem = (id: string, updatedItem: Partial<Item>) => (dispatch: Dispatch) => {
    // db.collection('items')
    //   .doc(id)
    //   .update(updatedItem)
    //   .then(() => {
    //     dispatch({ type: EDIT_ITEM, payload: { id, updatedData: updatedItem } });
    //   })
    //   .catch((error) => {
    //     console.error('Error editing item:', error);
    //   });
    console.log('Edited', id, updatedItem)

  };
  
  export const deleteItem = (id: string) => (dispatch: Dispatch) => {
    // db.collection('items')
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     dispatch({ type: DELETE_ITEM, payload: id });
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting item:', error);
    //   });
    console.log('Deleted', id)
  };