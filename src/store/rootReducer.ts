import { combineReducers } from 'redux';

import charactersReducer from '../pages/main/reducer';
import selectedCharactersReducer from '../features/FlyoutButtons/reducer';
import { charactersApi } from '../shared/api/characters-list';

const rootReducer = combineReducers({
  characters: charactersReducer,
  selectedCharacters: selectedCharactersReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
});

export default rootReducer;
