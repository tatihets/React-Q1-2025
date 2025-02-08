export const setToLC = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    console.error('Error during setting to LC');
  }
};

export const getFromLC = (key: string): string => {
  try {
    return localStorage.getItem(key) || '';
  } catch {
    console.error('Error during getting from LC');
    return '';
  }
};
