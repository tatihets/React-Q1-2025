import { Character } from '../../character-card/model';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacter = async (
  id: number
): Promise<Character | object> => {
  try {
    const url = id ? `${API_BASE_URL}/${id}` : `${API_BASE_URL}`;
    const response = await fetch(url);
    console.log(response);
    if (response.status === 404) {
      return {};
    }
    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }
    return response.json();
  } catch (error) {
    console.error('Error during fetching character');
    throw error;
  }
};
