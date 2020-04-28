import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Create the store from root reducer and add any middleware to it
 * @return {object} Returns the store and its persistor within an object
 */
export default function configureStore() {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
}
