import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import { NotFound } from '../ui';

describe('Not Found page', () => {
  test('Should render page', () => {
    render(<NotFound />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
});
