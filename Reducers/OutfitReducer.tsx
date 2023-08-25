import {
  OutfitActionTypes,
  ADD_OUTFIT,
  EDIT_OUTFIT,
  DELETE_OUTFIT,
  FETCH_OUTFITS_SUCCESS,
  FETCH_OUTFITS_FAILURE,
  FETCH_OUTFIT_BY_ID_SUCCESS,
  FETCH_OUTFIT_BY_ID_FAILURE,
  FETCH_OUTFITS_START
} from '../ReduxActions/ActionTypes/OutfitTypes';
import { Outfit } from '../ReduxActions/ActionTypes/OutfitTypes';

export interface OutfitState {
  outfits: Outfit[];
  loading: boolean;
}

const initialState: OutfitState = {
  loading: false,
  outfits: [
  //   {
  //   id: '1',
  //   items: [
  //     { category: "top", name: "T-shirt", image: "https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg" },
  //     { category: "bottom", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },
  //     { category: "shoes", name: "Chucks", image: "https://images.journeys.com/images/products/1_5122_ZM_THERO.JPG" }
  //   ]
  // },
  // {
  //   id: '2',
  //   items: [
  //     { category: "top", name: "Jacket", image: "https://www.stormtechusa.com/cdn/shop/products/QX-1_FRONT_AzureBlue_2faa399c-44af-4a43-9fd8-4be87ff5fc41_2000x.jpg?v=1687562304" },
  //     { category: "bottom", name: "Shorts", image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Feb%2Fd3%2Febd33c012f0cfb070719a4a4c9d920d38c360522.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]" },
  //     { category: "shoes", name: "Chucks", image: "https://images.journeys.com/images/products/1_5122_ZM_THERO.JPG" },
  //     { category: "bottosm", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },

  //     { category: "bottoam", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },
  //     { category: "bottom", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },

  //     { category: "bottom", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },

  //   ]
  // }
],
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
      case FETCH_OUTFITS_START:
      return {
        ...state,
        loading: true,
        outfits: action.payload,
      };
    case FETCH_OUTFITS_SUCCESS:
      return {
        ...state,
        loading: false,
        outfits: action.payload,
      };
    default:
      return state
  }
}

export default outfitsReducer;
