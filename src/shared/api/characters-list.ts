import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CharactersResponse } from '../model/characters-list';
import { CharacterDetails } from '../../entities/character-details/model';

type GetCharactersParams = {
  searchTerm: string | null;
  page: number;
};

export type UseGetCharactersError = {
  data: CharactersResponse;
};

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
  endpoints: (builder) => ({
    getCharacterDetail: builder.query<CharacterDetails, string | undefined>({
      query: (id) => {
        return id || '';
      },
      transformErrorResponse(baseQueryReturnValue) {
        if (baseQueryReturnValue.status === 404) {
          return {
            data: {},
          };
        }
        return {
          data: baseQueryReturnValue.data || 'Error during fetching characters',
        };
      },
    }),
    getCharacters: builder.query<CharactersResponse, GetCharactersParams>({
      query: ({ searchTerm, page }) => {
        return searchTerm
          ? `?page=${page}&name=${searchTerm}`
          : `?page=${page}`;
      },
      transformErrorResponse(baseQueryReturnValue) {
        if (baseQueryReturnValue.status === 404) {
          return {
            data: {
              info: {
                count: 1,
                pages: 1,
              },
              results: [],
            },
          };
        }

        return {
          data: baseQueryReturnValue.data || 'Error during fetching characters',
        };
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterDetailQuery } =
  charactersApi;
