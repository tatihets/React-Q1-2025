import { expect, test, describe, vi, Mock } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';

import CharacterDetail from '../';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  useParams: vi.fn(() => ({
    id: '1',
  })),
  useLocation: vi.fn(() => ({
    search: '?page=1',
  })),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../../character-details/api/fetch-character', () => ({
  fetchCharacter: vi.fn().mockResolvedValue({
    id: 1,
    name: 'Morty Smith',
    status: 'Alive',
    gender: 'Male',
    type: 'Human',
    image: 'https://example.com/image.jpg',
  }),
}));

vi.mock('../../../app/hooks/use-loading-error', () => ({
  useLoadingError: vi.fn(() => ({
    loading: false,
    error: null,
    setLoading: vi.fn(),
    setError: vi.fn(),
  })),
}));

describe('Character details', () => {
  test('should render character details correctly', async () => {
    render(
      <BrowserRouter>
        {' '}
        <CharacterDetail />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Gender: Male')).toBeInTheDocument();
      expect(screen.getByText('Type: Human')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://example.com/image.jpg'
      );
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
    render(
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
