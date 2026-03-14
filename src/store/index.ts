import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'
import homeReducer from "./slices/homeSlice"
import searchReducer from "./slices/searchSlice"
import profileReducer from "./slices/profileSlice"

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        home: homeReducer,
        search: searchReducer,
        profile: profileReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;