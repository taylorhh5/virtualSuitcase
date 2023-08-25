// itemActions.ts
import { Dispatch } from 'redux';
import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_LUGGAGE_ITEMS_SUCCESS, FETCH_LUGGAGE_ITEMS_FAILURE, FETCH_LUGGAGE_ITEMS_START, FETCH_ITEM_BY_ID_START, FETCH_ITEM_BY_ID_SUCCESS, FETCH_ITEM_BY_ID_FAILURE } from './ActionTypes/LuggageActionTypes';
import { Item } from './ActionTypes/LuggageActionTypes';
import { NavigationProp } from '@react-navigation/native';
//firebase
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'         
import { db } from '../firebase/config';
import { LuggageStackParamList } from '../Navigation/LuggageStackNavigator';


export const fetchItemsInSuitcase = (suitcaseId) => {
  return (dispatch: Dispatch) => {
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

export const fetchItemById = (itemId: string) => {
  return (dispatch: Dispatch) => {
    const itemDocRef = doc(db, 'luggageItems', itemId);
    dispatch({ type: FETCH_ITEM_BY_ID_START });

    getDoc(itemDocRef)
      .then(itemDoc => {
        if (itemDoc.exists()) {
          const itemData = itemDoc.data() as Item;
          dispatch({ type: FETCH_ITEM_BY_ID_SUCCESS, payload: itemData });
        } else {
          console.error('Error fetching item by ID: does not exist');
          dispatch({ type: FETCH_ITEM_BY_ID_FAILURE, payload: 'Item not found' });
        }
      })
      .catch(error => {
        console.error('Error fetching item by ID:', error);
        dispatch({ type: FETCH_ITEM_BY_ID_FAILURE, payload: error });
      });
  };
};