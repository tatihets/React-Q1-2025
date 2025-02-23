import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectSelectedCharactersPerPage = createSelector(
  (state: RootState, page: number) =>
    state.characters.selectedCharacters?.[page],
  (selectedForPage) => selectedForPage || []
);

export const selectSelectedCharacters = (
  state: RootState
): { [key: number]: number[] } | null => state.characters.selectedCharacters;
