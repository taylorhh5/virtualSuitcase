import { Suitcase, SuitcaseActionTypes, ADD_SUITCASE, EDIT_SUITCASE, DELETE_SUITCASE, FETCH_SUITCASES_SUCCESS, FETCH_SUITCASES_START } from '../ReduxActions/ActionTypes/SuitcaseActionTypes';

export interface SuitcasesState {
  suitcases: Suitcase[];
  loading: boolean
}

const defaultSuitcase: Suitcase = {
  id: '1',
  name: 'Default Suitcase',
};

const initialState: SuitcasesState = {
  suitcases: [],
  loading: false
};

const suitcasesReducer = (state = initialState, action: SuitcaseActionTypes): SuitcasesState => {
  switch (action.type) {
    case ADD_SUITCASE:
      console.log('reducer')
      return {
        ...state,
        suitcases: [...state.suitcases, action.payload],
        // loading:!state.loading
      };
    case EDIT_SUITCASE:
      return state;
    case DELETE_SUITCASE:
      return state;
    case FETCH_SUITCASES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUITCASES_SUCCESS:
      return {
        ...state,
        loading: false,
        suitcases: action.payload,
      };
    default:
      return state;
  }
};

export default suitcasesReducer;