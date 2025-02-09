import { useState, useEffect, useCallback, Fragment } from 'react';

import { Character } from '../../../entities/character-card/model';

import Search from '../../../features/Search';

import { fetchCharacters } from '../../../shared/api/characters-list';
import useLocalStorage from '../../../app/hooks/use-local-storage';
import { useLoadingError } from '../../../app/hooks/use-loading-error';

import './index.css';
import { Layout } from '../../../features/Layout/ui';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../../features/Pagination';

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
  const { page: urlPage } = useParams();
  const [savedTerm, saveToLC] = useLocalStorage<string>('searchTerm', '');
  const [searchTerm, setSearchTerm] = useState<string>(savedTerm);
  const { loading, error, setLoading, setError } = useLoadingError();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(Number(urlPage) || 1);
  const [totalPages, setTotalPages] = useState<number>(Number(urlPage) || 1);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetchCharacters(searchTerm, page);
      setCharacters(response.results);
      saveToLC(searchTerm);
      setTotalPages(response.info.pages);
    } catch (err: unknown) {
      const { message } = err as Record<string, string>;
      setLoading(false);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    navigate(`/?page=${page}`);
    fetchData();
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
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
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          >
            <Layout characters={characters} />
          </Pagination>
        )}
      </section>
    </Fragment>
  );
};
