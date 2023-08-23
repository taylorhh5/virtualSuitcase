import { combineReducers } from 'redux';
import suitcasesReducer from './SuitcaseReducer';
import luggageReducer from './LuggageReducer';
import outfitsReducer from './OutfitReducer';
import authReducer from './AuthReducer';
import { SuitcasesState } from './SuitcaseReducer';
import { LuggageState } from './LuggageReducer';
import { OutfitState } from './OutfitReducer';
import { AuthState } from './AuthReducer';


export interface RootState {
  suitcases: SuitcasesState;
  luggage: LuggageState;
  outfits: OutfitState;
  auth: AuthState;
}

const rootReducer = combineReducers({
  suitcases: suitcasesReducer,
  luggage: luggageReducer,
  outfits: outfitsReducer,
  auth: authReducer,

});

export default rootReducer;
