import { configureStore } from '@reduxjs/toolkit';

import characterReducer from '../pages/main/reducer';
import { charactersApi } from '../shared/api/characters-list';

const store = configureStore({
  reducer: {
    character: characterReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
