// itemActions.ts
import { Dispatch } from 'redux';
import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_ITEMS_IN_SUITCASE_SUCCESS, FETCH_ITEMS_IN_SUITCASE_FAILURE } from './ActionTypes/LuggageActionTypes';
import { Item } from './ActionTypes/LuggageActionTypes';
import { db } from '../firebase'; 



export const fetchItemsInSuitcase = (suitcaseId: string) => (dispatch: Dispatch) => {
    db.collection('suitcases')
      .doc(suitcaseId)
      .collection('items')
      .get()
      .then((querySnapshot) => {
        const items: Item[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as Item);
        });
        dispatch({ type: FETCH_ITEMS_IN_SUITCASE_SUCCESS, payload: items });
      })
      .catch((error) => {
        console.error('Error fetching items in suitcase:', error);
        dispatch({ type: FETCH_ITEMS_IN_SUITCASE_FAILURE, payload: error });
      });
  };

export const addItem = (item: Item) => (dispatch: Dispatch) => {
    db.collection('items')
      .add(item)
      .then((addedItem) => {
        dispatch({ type: ADD_ITEM, payload: { id: addedItem.id, ...item } });
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };
  
  export const editItem = (id: string, updatedItem: Partial<Item>) => (dispatch: Dispatch) => {
    db.collection('items')
      .doc(id)
      .update(updatedItem)
      .then(() => {
        dispatch({ type: EDIT_ITEM, payload: { id, updatedData: updatedItem } });
      })
      .catch((error) => {
        console.error('Error editing item:', error);
      });
  };
  
  export const deleteItem = (id: string) => (dispatch: Dispatch) => {
    db.collection('items')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_ITEM, payload: id });
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };