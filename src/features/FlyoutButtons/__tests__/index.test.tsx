import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import store from '../../../store';
import { FlyoutSetting } from '../ui';
import { setSelectedCharacters } from '../reducer';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('FlyoutButtons', () => {
  test('should render FlyoutSetting with buttons if there are selected elements', () => {
    store.dispatch(setSelectedCharacters({ page: 1, id: 1 }));
    renderWithProvider(
      <BrowserRouter>
        <FlyoutSetting />
      </BrowserRouter>
    );

    expect(screen.getAllByRole('button').length).toBe(2);
  });

  //   test('should render FlyoutSetting with buttons if there are selected elements', () => {
  //     store.dispatch(setSelectedCharacters({ page: 2, id: 3 }));
  //     renderWithProvider(
  //       <BrowserRouter>
  //         <FlyoutSetting />
  //       </BrowserRouter>
  //     );

  //     const unselectBtn = screen.getAllByRole('button')[0];
  //     fireEvent.click(unselectBtn);

  //     expect(screen.getAllByRole('button').length).toBe(0);
  //   });
});
