import { useEffect, useState } from 'react';
import { Button } from '../../../shared/ui';
import useLocalStorage from '../../../app/hooks/use-local-storage';

interface SearchProps {
  onSearch: (term: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [savedTerm, saveToLC] = useLocalStorage<string>('searchTerm', '');
  const [searchTerm, setSearchTerm] = useState<string>(savedTerm);

  useEffect(() => {
    onSearch(searchTerm);
  }, []);

  const handleSearchClick = () => {
    saveToLC(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search..."
      />
      <Button onClick={handleSearchClick}>Search</Button>
    </div>
  );
};
