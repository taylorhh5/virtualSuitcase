import {
    OutfitActionTypes,
    ADD_OUTFIT,
    EDIT_OUTFIT,
    DELETE_OUTFIT,
    FETCH_OUTFITS_SUCCESS,
    FETCH_OUTFITS_FAILURE,
    FETCH_OUTFIT_BY_ID_SUCCESS,
    FETCH_OUTFIT_BY_ID_FAILURE,
  } from '../ReduxActions/ActionTypes/OutfitTypes';
  import { Outfit } from '../ReduxActions/ActionTypes/OutfitTypes';
  
 export interface OutfitState {
    outfits: Outfit[];
  }
  
  const initialState: OutfitState = {
    outfits: [],
  };
  
  const outfitsReducer = (state = initialState, action: OutfitActionTypes): OutfitState => {
    switch (action.type) {
      case ADD_OUTFIT:
        return {
          ...state,
          outfits: [...state.outfits, action.payload],
        };
      case EDIT_OUTFIT:
        const updatedOutfits = state.outfits.map((outfit) =>
          outfit.id === action.payload.id ? { ...outfit, ...action.payload.updatedData } : outfit
        );
        return {
          ...state,
          outfits: updatedOutfits,
        };
      case DELETE_OUTFIT:
        const filteredOutfits = state.outfits.filter((outfit) => outfit.id !== action.payload);
        return {
          ...state,
          outfits: filteredOutfits,
        };
      case FETCH_OUTFITS_SUCCESS:
        return {
          ...state,
          outfits: action.payload,
        };
      default:
        return state
    }
}

export default outfitsReducer;
