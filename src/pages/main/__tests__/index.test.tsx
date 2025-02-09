import { expect, test, describe, Mock, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Main } from '../ui';
import useLocalStorage from '../../../app/hooks/use-local-storage';

vi.mock('../../../app/hooks/use-loading-error');
vi.mock('../../../app/hooks/use-local-storage');

describe('Main page', () => {
  vi.mock('../../../app/hooks/use-loading-error', () => ({
    useLoadingError: vi.fn(() => ({
      loading: false,
      error: null,
      setLoading: vi.fn(),
      setError: vi.fn(),
    })),
  }));

  test('should render search input and handle search term change', async () => {
    const mockSaveToLC = vi.fn();
    (useLocalStorage as Mock).mockReturnValue(['', mockSaveToLC]);

    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
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
