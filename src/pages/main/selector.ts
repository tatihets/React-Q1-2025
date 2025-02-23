import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectCharactersByPage = createSelector(
  (state: RootState, page: number) => state.characters.charactersByPage[page],
  (charactersForPage) => charactersForPage || []
);

export const selectCharacters = (state: RootState) =>
  state.characters.charactersByPage;

export const selectSearchTerm = (state: RootState): string | null => {
  return state.characters.searchTerm;
};
