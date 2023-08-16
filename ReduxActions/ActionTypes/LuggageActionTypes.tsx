export interface Item {
  id: string;
  name: string;
  category: string;
  image: string;
}

export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const FETCH_ITEMS_IN_SUITCASE_SUCCESS = 'FETCH_ITEMS_IN_SUITCASE_SUCCESS';
export const FETCH_ITEMS_IN_SUITCASE_FAILURE = 'FETCH_ITEMS_IN_SUITCASE_FAILURE';

interface FetchItemsInSuitcaseSuccessAction {
  type: typeof FETCH_ITEMS_IN_SUITCASE_SUCCESS;
  payload: Item[]; 
}

interface FetchItemsInSuitcaseFailureAction {
  type: typeof FETCH_ITEMS_IN_SUITCASE_FAILURE;
  payload: Error;
}

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Item;
}

interface EditItemAction {
  type: typeof EDIT_ITEM;
  payload: {
    id: string;
    updatedData: Partial<Item>;
  };
}

interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  payload: string; 
}

export type ItemActionTypes =
  | AddItemAction
  | EditItemAction
  | DeleteItemAction
  | FetchItemsInSuitcaseSuccessAction
  | FetchItemsInSuitcaseFailureAction;
