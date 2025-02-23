import { Character } from '../../entities/character-card/model';

export type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next?: string | null;
    prev?: number | null;
  };
  results: Character[];
};
