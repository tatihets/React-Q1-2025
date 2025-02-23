import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../entities/character-card/model';

export interface CharacterState {
  charactersByPage: { [key: number]: Character[] };
  selectedCharacters: { [key: number]: number[] } | null;
  searchTerm: string | null;
}

const initialState: CharacterState = {
  charactersByPage: {},
  selectedCharacters: null,
  searchTerm: null,
};

const characterSlice = createSlice({
  name: 'characters',
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
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPageCharacters: (
      state,
      action: PayloadAction<{ page: number; characters: Character[] }>
    ) => {
      const { page, characters } = action.payload;
      state.charactersByPage[page] = characters.map(({ id, name, image }) => ({
        id,
        name,
        image,
      }));
    },
  },
});

export const {
  setSelectedCharacters,
  setSearchTerm,
  setPageCharacters,
  removeSelectedCharacters,
} = characterSlice.actions;

export default characterSlice.reducer;
