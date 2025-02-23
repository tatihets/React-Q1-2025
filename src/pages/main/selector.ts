import { Character } from '../../entities/character-card/model';
import { RootState } from '../../store';

export const selectCharactersByPage = (
  state: RootState,
  page: number
): Character[] => {
  return state.character.charactersByPage[page] || [];
};

export const selectSelectedCharactersPerPage = (
  state: RootState,
  page: number
): number[] => {
  return (
    (state.character.selectedCharacters &&
      state.character.selectedCharacters[page]) ||
    []
  );
};

export const selectSelectedCharacters = (
  state: RootState
): { [key: number]: number[] } | null => state.character.selectedCharacters;

export const selectLoading = (state: RootState): boolean => {
  return state.character.loading;
};

export const selectError = (state: RootState): string | null => {
  return state.character.error;
};

export const selectSearchTerm = (state: RootState): string | null => {
  return state.character.searchTerm;
};
