import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedCharacterState {
  selectedCharacters: { [key: number]: number[] | undefined } | null;
}

const initialState: SelectedCharacterState = {
  selectedCharacters: null,
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
  },
});

export const { setSelectedCharacters, removeSelectedCharacters } =
  characterSlice.actions;

export default characterSlice.reducer;
