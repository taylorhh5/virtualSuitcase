export interface Item {
  id: string;
  name: string;
  category: string;
  image: string;
}

export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const FETCH_LUGGAGE_ITEMS_SUCCESS = 'FETCH_LUGGAGE_ITEMS_SUCCESS';
export const FETCH_LUGGAGE_ITEMS_FAILURE = 'FETCH_LUGGAGE_ITEMS_FAILURE';
export const FETCH_LUGGAGE_ITEMS_START = 'FETCH_LUGGAGE_ITEMS_START';

export const FETCH_ALL_LUGGAGE_ITEMS_SUCCESS = 'FETCH_ALL_LUGGAGE_ITEMS_SUCCESS';
export const FETCH_ALL_LUGGAGE_ITEMS_FAILURE = 'FETCH_ALL_LUGGAGE_ITEMS_FAILURE';
export const FETCH_ALL_LUGGAGE_ITEMS_START = 'FETCH_ALL_LUGGAGE_ITEMS_START';

export const FETCH_ITEM_BY_ID_SUCCESS = 'FETCH_ITEM_BY_ID_SUCCESS'
export const FETCH_ITEM_BY_ID_START = 'FETCH_ITEM_BY_ID_START'
export const FETCH_ITEM_BY_ID_FAILURE = 'FETCH_ITEM_BY_ID_FAILURE'




interface FetchLuggageItemsSuccessAction {
  type: typeof FETCH_LUGGAGE_ITEMS_SUCCESS;
  payload: Item[];
}

interface FetchLuggageItemsFailureAction {
  type: typeof FETCH_LUGGAGE_ITEMS_FAILURE;
  payload: Error;
}

interface FetchLuggageItemsStartAction {
  type: typeof FETCH_LUGGAGE_ITEMS_START;
  payload: Error;
}

interface FetchLuggageByIdSuccessAction {
  type: typeof FETCH_ITEM_BY_ID_START;
  payload: Item[];
}
interface FetchLuggageByIdFailAction {
  type: typeof FETCH_ITEM_BY_ID_START;
  payload: Item[];
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

interface FetchAllLuggageItemsSuccessAction {
  type: typeof FETCH_ALL_LUGGAGE_ITEMS_SUCCESS;
  payload: Item[];
}

interface FetchAllLuggageItemsFailureAction {
  type: typeof FETCH_ALL_LUGGAGE_ITEMS_FAILURE;
  payload: Error;
}

interface FetchAllLuggageItemsStartAction {
  type: typeof FETCH_ALL_LUGGAGE_ITEMS_START;
  payload: Error;
}

export type ItemActionTypes =
  | AddItemAction
  | EditItemAction
  | DeleteItemAction
  | FetchLuggageItemsSuccessAction
  | FetchLuggageItemsFailureAction
  | FetchLuggageItemsStartAction
  | FetchLuggageItemsStartAction
  | FetchLuggageByIdSuccessAction
  | FetchLuggageByIdFailAction
  | FetchAllLuggageItemsSuccessAction
  | FetchAllLuggageItemsFailureAction
  | FetchAllLuggageItemsStartAction

