import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../ui';

describe('Search feature', () => {
  test('should render input and button', () => {
    render(<Search onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should call onSearch when the search button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} />);

    const button = screen.getByText('Search');

    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalled();
  });
});
