import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import headerReducer from "./slices/header"
import customerReducer from './slices/customer';
import advanceFilterReducer from './slices/advance_filter';

export const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    header: headerReducer,
    advanceFilter: advanceFilterReducer,
  },
  
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
})
