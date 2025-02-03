const API_BASE_URL = 'https://swapi.dev/api/films';

export const fetchTasks = async (searchTerm: string) => {
  console.log('SEARCH TERM', searchTerm);
  const url = searchTerm
    ? `${API_BASE_URL}?search=${searchTerm}`
    : `${API_BASE_URL}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });
};
