import { ItemActionTypes, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_LUGGAGE_ITEMS_SUCCESS, FETCH_LUGGAGE_ITEMS_FAILURE, FETCH_LUGGAGE_ITEMS_START, FETCH_ALL_LUGGAGE_ITEMS_START, FETCH_ALL_LUGGAGE_ITEMS_SUCCESS, FETCH_ALL_LUGGAGE_ITEMS_FAILURE } from '../ReduxActions/ActionTypes/LuggageActionTypes';
import { Item } from '../ReduxActions/ActionTypes/LuggageActionTypes';

export interface LuggageState {
  luggage: Item[];
  loading: boolean;
  allLuggageLoading: boolean,
  allLuggage: Item[];
}

const initialState: LuggageState = {
  loading:false,
  luggage: [],
  allLuggageLoading: false,
  allLuggage: [],
};

const luggageReducer = (state = initialState, action: ItemActionTypes): LuggageState => {
  switch (action.type) {
    case FETCH_LUGGAGE_ITEMS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LUGGAGE_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        luggage: action.payload,
      };
      case FETCH_LUGGAGE_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        luggage: [],
      };
    case ADD_ITEM:
      return state;
    case EDIT_ITEM:
      return state;
    case DELETE_ITEM:
      return state;
      case FETCH_ALL_LUGGAGE_ITEMS_START:
      return {
        ...state,
        allLuggageLoading: true,
      };
    case FETCH_ALL_LUGGAGE_ITEMS_SUCCESS:
      return {
        ...state,
        allLuggageLoading: false,
        allLuggage: action.payload,
      };
      case FETCH_ALL_LUGGAGE_ITEMS_FAILURE:
      return {
        ...state,
        allLuggageLoading: false,
        allLuggage: [],
      };
    default:
      return state;
  }
};

export default luggageReducer;
