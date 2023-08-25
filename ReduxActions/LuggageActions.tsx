// itemActions.ts
import { Dispatch } from 'redux';
import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_LUGGAGE_ITEMS_SUCCESS, FETCH_LUGGAGE_ITEMS_FAILURE, FETCH_LUGGAGE_ITEMS_START } from './ActionTypes/LuggageActionTypes';
import { Item } from './ActionTypes/LuggageActionTypes';
import { NavigationProp } from '@react-navigation/native';
//firebase
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'         
import { db } from '../firebase/config';
import { LuggageStackParamList } from '../Navigation/LuggageStackNavigator';


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

export const addItem = (item: Item, navigation: NavigationProp<LuggageStackParamList, 'AddItemForm'>) => {
  return (dispatch: Dispatch) => {
    addDoc(collection(db, 'luggageItems'), item)
      .then((itemDocRef) => {
        dispatch({ type: ADD_ITEM, payload: { item } });
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };
};

export const editItem = (itemId: string, updatedItem: Partial<Item>) => {
  return (dispatch: Dispatch) => {
    updateDoc(doc(db, 'luggageItems', itemId), updatedItem)
      .then(() => {
        dispatch({ type: EDIT_ITEM, payload: { id: itemId, updatedData: updatedItem } });
      })
      .catch((error) => {
        console.error('Error editing item:', error);
      });
  };
};

export const deleteItem = (itemId: string) => {
  return (dispatch: Dispatch) => {
    deleteDoc(doc(db, 'luggageItems', itemId))
      .then(() => {
        dispatch({ type: DELETE_ITEM, payload: itemId });
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };
};

  // export const getLuggageItemById = (itemId: string) => {
  //   return (dispatch: Dispatch) => {
  //     // dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_START });
  
  //     const luggageItemRef = doc(db, 'luggageItems', itemId);
  
  //     onSnapshot(
  //       luggageItemRef,
  //       snapshot => {
  //         if (snapshot.exists) {
  //           const luggageItem = snapshot.data();
  //           dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_SUCCESS, payload: luggageItem });
  //         } else {
  //           dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_FAILURE, payload: 'Luggage item not found' });
  //         }
  //       },
  //       error => {
  //         console.error('Error fetching luggage item by ID:', error);
  //         dispatch({ type: GET_LUGGAGE_ITEM_BY_ID_FAILURE, payload: error });
  //       }
  //     );
  //   };
  // };