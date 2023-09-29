import { Suitcase, SuitcaseActionTypes, ADD_SUITCASE, EDIT_SUITCASE, DELETE_SUITCASE, FETCH_SUITCASES_SUCCESS, FETCH_SUITCASES_START, FETCH_SUITCASES_FAILURE } from '../ReduxActions/ActionTypes/SuitcaseActionTypes';

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
      return state;
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
      case FETCH_SUITCASES_FAILURE:
        return {
          ...state,
          loading: false,
          suitcases: [],
        };
    default:
      return state;
  }
};

export default suitcasesReducer;