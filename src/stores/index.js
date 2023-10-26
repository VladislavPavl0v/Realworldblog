import { configureStore } from '@reduxjs/toolkit';
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
import blogReducer from './sliceBlog';

const persistConfig = {
  key: 'blog',
  storage,
  whitelist: ['user'],
};

const persistedBlogReducer = persistReducer(persistConfig, blogReducer);

const store = configureStore({
  reducer: {
    blog: persistedBlogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
