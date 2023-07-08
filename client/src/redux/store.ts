import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { loadState, saveState } from "@/utils/localstorage";

const persistedState = loadState(); // Retrieve saved state from cookie
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState()); // Save state to cookie on every state change
});

export default store;
