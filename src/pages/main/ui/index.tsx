import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Search from '../../../features/Search';
import Layout from '../../../features/Layout';
import Pagination from '../../../features/Pagination';

import FlyoutSetting from '../../../features/FlyoutButtons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchTerm,
  selectCharactersByPage,
  selectError,
  selectLoading,
} from '../selector';
import { Spinner } from '../../../shared/ui';
import { useGetCharactersQuery } from '../../../shared/api/characters-list';
import { setPageCharacters, setSearchTerm } from '../reducer';
import { RootState } from '../../../store';

export const Main = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [totalPages, setTotalPages] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const charactersByPage = useSelector((state: RootState) =>
    selectCharactersByPage(state, page)
  );
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchTerm = useSelector(selectSearchTerm);

  const { data: characters } = useGetCharactersQuery(
    {
      page,
      searchTerm,
    },
    {
      skip: searchTerm === null,
    }
  );

  useEffect(() => {
    if (characters) {
      console.log('AAAAAAAAAAAAAa', characters);
      dispatch(setPageCharacters({ page, characters: characters.results }));
      setTotalPages(characters.info.pages);
    }
  }, [characters, dispatch, page, searchTerm]);

  const handlePageChange = (page: number) => {
    setPage(page);
    navigate(`/?page=${page}`);
  };

  const handleSearchTermChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <Fragment>
      <section className="main">
        <Search onSearch={handleSearchTermChange} />
        {!loading && !error && charactersByPage.length && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          >
            <Layout characters={charactersByPage} />
          </Pagination>
        )}
        {loading && <Spinner />}
        {error && <div className="error-message">{error}</div>}
      </section>
      <FlyoutSetting />
    </Fragment>
  );
};
