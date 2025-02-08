import { Button } from '../../../shared/ui';

import './index.css';

interface SearchProps {
  searchTerm: string;
  onSearch: () => void;
  onSearchTermChange: (term: string) => void;
}

export const Search = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
}: SearchProps) => (
  <div className="search">
    <input
      type="text"
      value={searchTerm}
      onChange={(event) => onSearchTermChange(event.target.value)}
      placeholder="Search..."
    />
    <Button onClick={onSearch}>Search</Button>
  </div>
);
