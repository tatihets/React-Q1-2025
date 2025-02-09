import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../ui';

describe('Search feature', () => {
  test('should render input and button', () => {
    render(
      <Search searchTerm="" onSearchTermChange={vi.fn()} onSearch={vi.fn()} />
    );

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should call onSearchTermChange when typing in the input', () => {
    const mockOnSearchTermChange = vi.fn();
    render(
      <Search
        searchTerm=""
        onSearchTermChange={mockOnSearchTermChange}
        onSearch={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Test' } });

    expect(mockOnSearchTermChange).toHaveBeenCalledWith('Test');
  });

  test('should call onSearch when the search button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(
      <Search
        searchTerm="Test"
        onSearchTermChange={vi.fn()}
        onSearch={mockOnSearch}
      />
    );

    const button = screen.getByText('Search');

    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalled();
  });
});
