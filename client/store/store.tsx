import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { filterReducer } from "./slice/filterSlice";
import { authReducer } from "./slice/authSlice";
import { userApi } from './api/usersApi';
import { trelloApi } from "./api/trelloApi";
import { trelloReducer } from "./slice/trelloSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
  trell: trelloReducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [trelloApi.reducerPath]: trelloApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }).concat(trelloApi.middleware, userApi.middleware),
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch