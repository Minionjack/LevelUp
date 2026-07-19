/**
 * Redux Store Configuration
 * Main store setup with Redux Toolkit and persistence
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './slices/authSlice';
import characterReducer from './slices/characterSlice';
import habitReducer from './slices/habitSlice';
import objectiveReducer from './slices/objectiveSlice';
import inventoryReducer from './slices/inventorySlice';

/**
 * Persist configuration
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'character', 'inventory'], // Only persist these slices
};

/**
 * Root reducer
 */
const rootReducer = combineReducers({
  auth: authReducer,
  character: characterReducer,
  habits: habitReducer,
  objectives: objectiveReducer,
  inventory: inventoryReducer,
});

/**
 * Persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

/**
 * Persistor
 */
export const persistor = persistStore(store);

/**
 * Type exports
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

