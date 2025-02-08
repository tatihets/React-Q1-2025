import { Character } from '../../entities/character-card/model';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/?page=1';

export const fetchCharacters = async (
  searchTerm: string
): Promise<Character[]> => {
  try {
    const url = searchTerm
      ? `${API_BASE_URL}&name=${searchTerm}`
      : `${API_BASE_URL}`;
    const response = await fetch(url);
    console.log(response);
    if (response.status === 404) {
      return [];
    }
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error during fetch items');
    throw error;
  }
};
