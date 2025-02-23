import { expect, test, describe, vi, Mock } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';

import charactersListMockedResponse from '../../../shared/__tests__/fixtures/characterslist.json';
import { CharacterDetail } from '../ui';
import store from '../../../store';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Character details entity', () => {
  const character = charactersListMockedResponse.results[0];

  test('should render character details correctly', async () => {
    renderWithProvider(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Status: ${character.status}`)
      ).toBeInTheDocument();
      expect(screen.getByText(`Type: ${character.type}`)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', character.image);
    });
  });

  test('should navigate to page after clicking close', async () => {
    (useParams as Mock).mockImplementationOnce(
      vi.fn(() => ({
        id: '1',
      }))
    );
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    renderWithProvider(
      <BrowserRouter>
        {' '}
        <CharacterDetail />
      </BrowserRouter>
    );

    await waitFor(() => {
      const card = screen.getByRole('button');
      fireEvent.click(card);
      expect(mockNavigate).toHaveBeenCalledWith(`/?page=1`);
    });
  });
});
