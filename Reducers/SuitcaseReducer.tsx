import { Suitcase, SuitcaseActionTypes, ADD_SUITCASE, EDIT_SUITCASE, DELETE_SUITCASE, FETCH_SUITCASES_SUCCESS } from '../ReduxActions/ActionTypes/SuitcaseActionTypes';

export interface SuitcasesState {
  suitcases: Suitcase[];
  loading:boolean
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
  loading:false
};

const suitcasesReducer = (state = initialState, action: SuitcaseActionTypes): SuitcasesState => {
  switch (action.type) {
    case ADD_SUITCASE:
      console.log('reducer')
      return {
        ...state,
        suitcases: [...state.suitcases, action.payload],
        loading:!state.loading
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