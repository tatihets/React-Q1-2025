import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { charactersApi } from '../../shared/api/characters-list';
import { Character } from '../../entities/character-card/model';

interface CharacterState {
  charactersByPage: { [key: number]: Character[] };
  selectedCharacters: { [key: number]: number[] } | null;
  loading: boolean;
  error: string | null;
  searchTerm: string | null;
}

const initialState: CharacterState = {
  charactersByPage: {},
  selectedCharacters: null,
  loading: false,
  error: null,
  searchTerm: null,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    removeSelectedCharacters: (state) => {
      state.selectedCharacters = null;
    },
    setSelectedCharacters: (
      state,
      action: PayloadAction<{ page: number; id: number }>
    ) => {
      const { page, id } = action.payload;
      if (!state.selectedCharacters) {
        state.selectedCharacters = {};
        state.selectedCharacters[page] = [id];
      } else if (!state.selectedCharacters[page]) {
        state.selectedCharacters[page] = [id];
      } else {
        const index = state.selectedCharacters[page].indexOf(id);
        if (index > -1) {
          state.selectedCharacters[page].splice(index, 1);
        } else {
          state.selectedCharacters[page] = [
            ...state.selectedCharacters[page],
            id,
          ];
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPageCharacters: (
      state,
      action: PayloadAction<{ page: number; characters: Character[] }>
    ) => {
      const { page, characters } = action.payload;
      state.charactersByPage[page] = characters;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      charactersApi.endpoints.getCharacters.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      charactersApi.endpoints.getCharacters.matchRejected,
      (state, action) => {
        state.loading = false;
        console.log('AAAAAAAAA', action);
        state.error = action.error.message || 'Error during data fetch';
      }
    );
    builder.addMatcher(
      charactersApi.endpoints.getCharacters.matchFulfilled,
      (state) => {
        state.loading = false;
        state.error = null;
      }
    );
  },
});

export const {
  setSelectedCharacters,
  setLoading,
  setError,
  setSearchTerm,
  setPageCharacters,
  removeSelectedCharacters,
} = characterSlice.actions;

export default characterSlice.reducer;
