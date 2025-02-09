import { expect, test, describe, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';
import '@testing-library/jest-dom'; // Import jest-dom matchers

import CharacterCard from '../';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  useParams: vi.fn(() => ({
    id: '',
  })),
  useLocation: vi.fn(() => ({
    search: '?page=2',
  })),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('Character card entity', () => {
  test('should render card correctly', () => {
    render(
      <BrowserRouter>
        {' '}
        <CharacterCard id={1} name="test" image="https://test.jpeg" />
      </BrowserRouter>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('should navigate to details of character after clicking the card if there is no id in params', async () => {
    const mockNavigate = vi.fn();

    (useNavigate as Mock).mockReturnValue(mockNavigate);
    render(
      <BrowserRouter>
        {' '}
        <CharacterCard id={1} name="test" image="https://test.jpeg" />
      </BrowserRouter>
    );

    const card = screen.getByRole('img');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith(`/characters/${1}?page=2`);
  });

  test('should navigate to details of character after clicking the card if there is id in params', async () => {
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
        <CharacterCard id={1} name="test" image="https://test.jpeg" />
      </BrowserRouter>
    );

    const card = screen.getByRole('img');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith(`/?page=2`);
  });
});
