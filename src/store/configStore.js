import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from '../features/cartSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})
export const store = configureStore({
    reducer: {
        cart: persistedReducer,
    },
    middleware: customizedMiddleware

});

export const persistor = persistStore(store);
