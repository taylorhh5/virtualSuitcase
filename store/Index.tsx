// Packages
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistStore, persistReducer } from "redux-persist";

// imports
import rootReducer from "../Reducers/RootReducer";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  whitelist: ['auth'], // List of reducers to persist
  storage: AsyncStorage,   // Storage method (AsyncStorage in this case)
};

// Create a persisted reducer with the given configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Function to create and return the Redux store and persistor
export default () => {
  // Create the store using the persisted reducer and apply the thunk middleware
  let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  
  // Create a persistor using the store
  let persistor = persistStore(store);

  // Return both the store and the persistor
  return { store, persistor };
};
