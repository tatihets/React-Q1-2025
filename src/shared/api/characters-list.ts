import { CharactersResponse } from '../model/characters-list';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const fetchCharacters = async (
  searchTerm: string,
  page: number = 1
): Promise<CharactersResponse> => {
  try {
    const url = searchTerm
      ? `${API_BASE_URL}?page=${page}&name=${searchTerm}`
      : `${API_BASE_URL}?page=${page}`;
    const response = await fetch(url);
    if (response.status === 404) {
      return {
        info: {
          count: page,
          pages: page,
        },
        results: [],
      };
    }
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during fetch items');
    throw error;
  }
};
