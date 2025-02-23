import { expect, test, describe, Mock, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Main } from '../ui';
import useLocalStorage from '../../../app/hooks/use-local-storage';
import store from '../../../store';
import Theme from '../../../features/Theme';
import { ThemeProvider } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { setSearchTerm } from '../reducer';

vi.mock('../../../app/hooks/use-local-storage');

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Main page', () => {
  vi.mock('../../../app/hooks/use-theme', () => ({
    useTheme: vi.fn(() => ({
      isDarkMode: false,
      setMode: vi.fn(),
    })),
  }));

  test('should render search input and handle search term change', async () => {
    const mockSaveToLC = vi.fn();
    (useLocalStorage as Mock).mockReturnValue(['', mockSaveToLC]);

    store.dispatch(setSearchTerm('search'));

    renderWithProvider(
      <ThemeProvider>
        <BrowserRouter>
          <Theme />
          <Main />
        </BrowserRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'Test' } });

      const button = screen.getByText('Search');
      fireEvent.click(button);

      expect(mockSaveToLC).toHaveBeenCalledWith('Test');
    });
  });
});
