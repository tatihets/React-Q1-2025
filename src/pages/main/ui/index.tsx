import { useNavigate } from 'react-router-dom';

import { useState, useEffect, useCallback, Fragment } from 'react';

import { Character } from '../../../entities/character-card/model';

import Search from '../../../features/Search';

import { fetchCharacters } from '../../../shared/api/characters-list';
import useLocalStorage from '../../../app/hooks/use-local-storage';
import { useLoadingError } from '../../../app/hooks/use-loading-error';

import './index.css';
import { Layout } from '../../../features/Layout/ui';

// type LoadingState = {
//   status: 'loading';
// };

// type CharactersState = {
//   status: 'success';
//   characters: Character[];
// };

// type ErrorState = {
//   status: 'error';
//   error: string | undefined;
// };

// type State = LoadingState | CharactersState | ErrorState;

export const Main = () => {
  const [savedTerm, saveToLC] = useLocalStorage<string>('searchTerm', '');
  const [searchTerm, setSearchTerm] = useState<string>(savedTerm);
  const { loading, error, setLoading, setError } = useLoadingError();
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetchCharacters(searchTerm);
      setCharacters(response);
      setLoading(false);
      saveToLC(searchTerm);
    } catch (err: unknown) {
      const { message } = err as Record<string, string>;
      setLoading(false);
      setError(message);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (id: number) => {
    console.log('CLICKED');
    navigate(`character/${id}`);
  };

  return (
    <Fragment>
      <header>
        <h1>Search Rick and Morty characters</h1>
      </header>
      <section className="main">
        <Search
          searchTerm={searchTerm}
          onSearch={fetchData}
          onSearchTermChange={(value: string) => setSearchTerm(value)}
        />
        {!loading && !error && (
          <Layout characters={characters} onCardClick={handleItemClick} />
        )}
      </section>
    </Fragment>
  );
};
