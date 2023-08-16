import { ItemActionTypes, ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from '../ReduxActions/ActionTypes/LuggageActionTypes';
import { Item } from '../ReduxActions/ActionTypes/LuggageActionTypes';

export interface LuggageState {
  items: Item[];
}

const initialState: LuggageState = {
  items: [],
};

const itemsReducer = (state = initialState, action: ItemActionTypes): LuggageState => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case EDIT_ITEM:
      return state;
    case DELETE_ITEM:
      return state;
    default:
      return state;
  }
};

export default itemsReducer;
