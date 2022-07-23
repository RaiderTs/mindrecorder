import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import sidebarReducer from '../features/sidebarSlice';
import { mrApi } from '../features/mrQuery';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sidebarPersistConfig = {
  key: 'sidebar',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedIn'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  sidebar: persistReducer(sidebarPersistConfig, sidebarReducer),
  [mrApi.reducerPath]: mrApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mrApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export default store;
