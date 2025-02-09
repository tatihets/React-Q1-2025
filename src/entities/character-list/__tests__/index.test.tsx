import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import CharacterList from '../';

import charactersListMockedResponse from './fixtures/characterslist.json';

describe('Characters List', () => {
  test('should render the specified number of characters', async () => {
    render(
      <BrowserRouter>
        {' '}
        <CharacterList characters={charactersListMockedResponse.results} />
      </BrowserRouter>
    );
    const cards = await screen.findAllByAltText('card image');
    expect(cards.length).toBe(1);
  });

  test('should display a message when no cards are present', async () => {
    render(<CharacterList characters={[]} />);
    const image = await screen.findAllByAltText('Not found items');
    expect(image).toBeDefined();
  });
});
