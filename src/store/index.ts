import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';
import { charactersApi } from '../shared/api/characters-list';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
