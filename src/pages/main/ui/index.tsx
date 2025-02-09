import { useState, useEffect, useCallback, Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Character } from '../../../entities/character-card/model';

import Search from '../../../features/Search';
import Layout from '../../../features/Layout';
import Pagination from '../../../features/Pagination';

import useLocalStorage from '../../../app/hooks/use-local-storage';
import { useLoadingError } from '../../../app/hooks/use-loading-error';

import { fetchCharacters } from '../../../shared/api/characters-list';

export const Main = () => {
  const [searchParams] = useSearchParams();
  const [savedTerm, saveToLC] = useLocalStorage<string>('searchTerm', '');
  const [searchTerm, setSearchTerm] = useState<string>(savedTerm);
  const { loading, error, setLoading, setError } = useLoadingError();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [totalPages, setTotalPages] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetchCharacters(searchTerm, page);
      setCharacters(response.results);
      saveToLC(searchTerm);
      setTotalPages(response.info.pages);
      if (!response.results.length) {
        setPage(1);
      }
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
