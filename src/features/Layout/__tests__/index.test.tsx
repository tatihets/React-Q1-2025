import { expect, test, describe, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';
import '@testing-library/jest-dom';

import { Layout } from '../ui';
import charactersListMockedResponse from '../../../shared/__tests__/fixtures/characterslist.json';

describe('Layout feature', () => {
  const characters = charactersListMockedResponse.results;

  test('should render CharacterList with the passed characters', () => {
    render(
      <BrowserRouter>
        <Layout characters={characters} />
      </BrowserRouter>
    );

    expect(screen.getByText(characters[0].name)).toBeInTheDocument();
  });

  test('should call navigate with correct page query when layout is clicked and character id exists', () => {
    const mockNavigate = vi.fn();

    (useNavigate as Mock).mockReturnValue(mockNavigate);
    render(
      <BrowserRouter>
        <Layout characters={characters} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(characters[0].name));
    expect(screen.getByTestId('layout').nextSibling).toHaveClass('open');
    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  test('should not call navigate when selectedCharacterId does not exist', () => {
    const mockNavigate = vi.fn();

    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useParams as Mock).mockReturnValue(
      vi.fn(() => ({
        id: '',
      }))
    );
    render(
      <BrowserRouter>
        <Layout characters={characters} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('layout'));

    expect(screen.getByTestId('layout').nextSibling).not.toHaveClass('open');
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
