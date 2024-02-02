import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
