export interface Outfit {
    id: string;
    name: string;
    items: string[];
  }
  
  export const ADD_OUTFIT = 'ADD_OUTFIT';
  export const EDIT_OUTFIT = 'EDIT_OUTFIT';
  export const DELETE_OUTFIT = 'DELETE_OUTFIT';
  export const FETCH_OUTFITS_SUCCESS = 'FETCH_OUTFITS_SUCCESS';
  export const FETCH_OUTFITS_FAILURE = 'FETCH_OUTFITS_FAILURE';
  export const FETCH_OUTFIT_BY_ID_SUCCESS = 'FETCH_OUTFIT_BY_ID_SUCCESS';
  export const FETCH_OUTFIT_BY_ID_FAILURE = 'FETCH_OUTFIT_BY_ID_FAILURE';
  
  interface AddOutfitAction {
    type: typeof ADD_OUTFIT;
    payload: Outfit;
  }
  
  interface EditOutfitAction {
    type: typeof EDIT_OUTFIT;
    payload: {
      id: string;
      updatedData: Partial<Outfit>;
    };
  }
  
  interface DeleteOutfitAction {
    type: typeof DELETE_OUTFIT;
    payload: string;
  }
  
  interface FetchOutfitsSuccessAction {
    type: typeof FETCH_OUTFITS_SUCCESS;
    payload: Outfit[];
  }
  
  interface FetchOutfitsFailureAction {
    type: typeof FETCH_OUTFITS_FAILURE;
    payload: Error;
  }
  
  interface FetchOutfitByIdSuccessAction {
    type: typeof FETCH_OUTFIT_BY_ID_SUCCESS;
    payload: Outfit;
  }
  
  interface FetchOutfitByIdFailureAction {
    type: typeof FETCH_OUTFIT_BY_ID_FAILURE;
    payload: Error;
  }
  
  export type OutfitActionTypes =
    | AddOutfitAction
    | EditOutfitAction
    | DeleteOutfitAction
    | FetchOutfitsSuccessAction
    | FetchOutfitsFailureAction
    | FetchOutfitByIdSuccessAction
    | FetchOutfitByIdFailureAction;
  