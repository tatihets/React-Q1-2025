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

global.fetch = vi.fn(
  () =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: {
        get: vi.fn().mockReturnValue('application/json'),
      },
      json: () =>
        Promise.resolve({
          id: 1,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: 'type',
          gender: 'Male',
          origin: {
            name: 'Earth',
          },
          location: {
            name: 'Earth',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:50:21.651Z',
        }),
    } as unknown as Response) // Type assertion to ensure it conforms to the Response type
);

describe('Character card', () => {
  test('should render card correctly', () => {
    render(
      <BrowserRouter>
        {' '}
        <CharacterCard id={1} name="test" image="https://test.jpeg" />
      </BrowserRouter>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('clicking card navigates to details characters path if there is no id in params', async () => {
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

  test('clicking card navigates to details characters path if there is id in params', async () => {
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
