import { FC, ReactNode } from 'react';

interface PaginationUIProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
}

export const Pagination: FC<PaginationUIProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  children,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return (
    <div className="pagination">
      {totalPages !== 1 && (
        <button
          onClick={handlePrevious}
          className="previous"
          disabled={currentPage === 1}
        />
      )}
      {children}
      {totalPages !== 1 && (
        <button
          onClick={handleNext}
          className="next"
          disabled={currentPage === totalPages}
        />
      )}
    </div>
  );
};
