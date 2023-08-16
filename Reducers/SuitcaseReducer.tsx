import { Suitcase, SuitcaseActionTypes, ADD_SUITCASE, EDIT_SUITCASE, DELETE_SUITCASE, FETCH_SUITCASES_SUCCESS } from '../ReduxActions/ActionTypes/SuitcaseActionTypes';

export interface SuitcasesState {
  suitcases: Suitcase[];
}

const defaultSuitcase: Suitcase = {
  id: '1',
  name: 'Default Suitcase',
};

const initialState: SuitcasesState = {
  suitcases: [{
    id: '1',
    name: 'Beach',
  }, {
    id: '2',
    name: 'Montana',
  }],
};

const suitcasesReducer = (state = initialState, action: SuitcaseActionTypes): SuitcasesState => {
  switch (action.type) {
    case ADD_SUITCASE:
      return {
        ...state,
        suitcases: [...state.suitcases, action.payload],
      };
    case EDIT_SUITCASE:
      return state;
    case DELETE_SUITCASE:
      return state;
    case FETCH_SUITCASES_SUCCESS:
      return {
        ...state,
        suitcases: action.payload,
      };
    default:
      return state;
  }
};

export default suitcasesReducer;