import { combineReducers } from 'redux';
import suitcasesReducer from './SuitcaseReducer';
import luggageReducer from './LuggageReducer';
import outfitsReducer from './OutfitReducer';
import { SuitcasesState } from './SuitcaseReducer';
import { LuggageState } from './LuggageReducer';
import { OutfitState } from './OutfitReducer';


export interface RootState {
    suitcases: SuitcasesState;
    luggage: LuggageState;
    outfits: OutfitState;
  }

const rootReducer = combineReducers({
  suitcases: suitcasesReducer,
  luggage: luggageReducer,
  outfits: outfitsReducer,
});

export default rootReducer;
