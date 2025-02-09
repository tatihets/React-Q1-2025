import { expect, test, describe, vi } from 'vitest';
import { Pagination } from '../ui';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Pagination feature', () => {
  const mockOnPageChange = vi.fn();

  test('should render children correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      >
        <div>Child Element</div>
      </Pagination>
    );

    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });

  test('should disable previous button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      >
        <div>Child Element</div>
      </Pagination>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();

    fireEvent.click(buttons[1]);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('should hide next button on the last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      >
        <div>Child Element</div>
      </Pagination>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[1]).toBeDisabled();

    fireEvent.click(buttons[0]);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});
