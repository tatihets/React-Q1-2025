import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../../../features/Search';
import Layout from '../../../features/Layout';
import Pagination from '../../../features/Pagination';
import FlyoutSetting from '../../../features/FlyoutButtons';
import { selectSearchTerm, selectCharactersByPage } from '../selector';
import { Spinner } from '../../../shared/ui';
import {
  useGetCharactersQuery,
  UseGetCharactersError,
} from '../../../shared/api/characters-list';
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
  const searchTerm = useSelector(selectSearchTerm);

  const {
    data: characters,
    isLoading,
    isFetching,
    isError,
    error = {},
  } = useGetCharactersQuery(
    {
      page,
      searchTerm,
    },
    {
      skip: searchTerm === null,
    }
  );

  const { data: errorData } = error as UseGetCharactersError;

  useEffect(() => {
    if (errorData || characters) {
      dispatch(
        setPageCharacters({
          page,
          characters: errorData?.results || characters?.results,
        })
      );
      navigate(`/?page=${page}`);
    }
  }, [characters, errorData]);

  useEffect(() => {
    setTotalPages(errorData?.info.pages || characters?.info.pages || 1);
  }, [errorData?.info?.pages, characters?.info.pages]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearchTermChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <Fragment>
      <section className="main">
        <Search onSearch={handleSearchTermChange} />
        {!isLoading &&
          ((isError && errorData?.results) || !isError) &&
          !isFetching && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            >
              <Layout characters={charactersByPage} />
            </Pagination>
          )}
        {(isLoading || isFetching) && <Spinner />}
        {isError && !errorData?.results && (
          <div className="error-message">{JSON.stringify(errorData)}</div>
        )}
      </section>
      <FlyoutSetting />
    </Fragment>
  );
};
