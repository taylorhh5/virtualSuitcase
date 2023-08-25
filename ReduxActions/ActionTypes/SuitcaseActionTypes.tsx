
export interface Suitcase {
    id: string;
    name: string;
  }
  
  export const ADD_SUITCASE = 'ADD_SUITCASE';
  export const EDIT_SUITCASE = 'EDIT_SUITCASE';
  export const DELETE_SUITCASE = 'DELETE_SUITCASE';
  export const FETCH_SUITCASES_SUCCESS = 'FETCH_SUITCASES_SUCCESS';
  export const FETCH_SUITCASES_START = 'FETCH_SUITCASES_START';
  export const FETCH_SUITCASES_FAILURE = 'FETCH_SUITCASES_FAILURE';
  export const FETCH_SUITCASE_BY_ID_SUCCESS = 'FETCH_SUITCASE_BY_ID_SUCCESS';
  export const FETCH_SUITCASE_BY_ID_FAILURE = 'FETCH_SUITCASE_BY_ID_FAILURE';
  
  interface AddSuitcaseAction {
    type: typeof ADD_SUITCASE;
    payload: Suitcase;
  }
  
  interface EditSuitcaseAction {
    type: typeof EDIT_SUITCASE;
    payload: {
      id: string;
      updatedData: Partial<Suitcase>;
    };
  }
  
  interface DeleteSuitcaseAction {
    type: typeof DELETE_SUITCASE;
    payload: string; 
  }
  
  interface FetchSuitcasesSuccessAction {
    type: typeof FETCH_SUITCASES_SUCCESS;
    payload: Suitcase[];
  }

  interface FetchSuitcasesStartAction {
    type: typeof FETCH_SUITCASES_START;
    payload: Suitcase[];
  }
  
  
  interface FetchSuitcasesFailureAction {
    type: typeof FETCH_SUITCASES_FAILURE;
    payload: Error;
  }
  
  interface FetchSuitcaseByIdSuccessAction {
    type: typeof FETCH_SUITCASE_BY_ID_SUCCESS;
    payload: Suitcase;
  }
  
  interface FetchSuitcaseByIdFailureAction {
    type: typeof FETCH_SUITCASE_BY_ID_FAILURE;
    payload: Error;
  }
  
  export type SuitcaseActionTypes =
    | AddSuitcaseAction
    | EditSuitcaseAction
    | DeleteSuitcaseAction
    | FetchSuitcasesSuccessAction
    | FetchSuitcasesStartAction
    | FetchSuitcasesFailureAction
    | FetchSuitcaseByIdSuccessAction
    | FetchSuitcaseByIdFailureAction;
  