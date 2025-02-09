import { Character } from '../../entities/character-card/model';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const fetchCharacters = async (
  searchTerm: string,
  page: number = 1
): Promise<Character[]> => {
  try {
    const url = searchTerm
      ? `${API_BASE_URL}?page=${page}&name=${searchTerm}`
      : `${API_BASE_URL}`;
    const response = await fetch(url);
    if (response.status === 404) {
      return [];
    }
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('ALLL', data.results);
    return data.results;
  } catch (error) {
    console.error('Error during fetch items');
    throw error;
  }
};
