import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import { CharacterList } from '../ui';
import charactersListMockedResponse from '../../../shared/__tests__/fixtures/characterslist.json';

import store from '../../../store';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Characters list entity', () => {
  test('should render the specified number of characters', async () => {
    renderWithProvider(
      <BrowserRouter>
        <CharacterList characters={charactersListMockedResponse.results} />
      </BrowserRouter>
    );
    const cards = await screen.findAllByAltText('card image');
    expect(cards.length).toBe(1);
  });

  test('should display a message when no cards are present', async () => {
    renderWithProvider(<CharacterList characters={[]} />);
    const image = await screen.findAllByAltText('Not found items');
    expect(image).toBeDefined();
  });
});
