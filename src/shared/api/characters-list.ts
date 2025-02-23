import { CharactersResponse } from '../model/characters-list';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Character } from '../../entities/character-card/model';

interface GetCharactersParams {
  searchTerm: string | null;
  page: number;
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
    // fetchFn: async (args) => {
    //   const response = await fetch(args.url);
    //   // if (response.status === 404) {
    //   //   return {
    //   //     info: {
    //   //       count: page,
    //   //       pages: page,
    //   //     },
    //   //     results: [],
    //   //   };
    //   // }
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch data');
    //   }
    //   return response.json(); // Return the JSON data
    // },
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, GetCharactersParams>({
      query: ({ searchTerm, page }) => {
        return searchTerm
          ? `?page=${page}&name=${searchTerm}`
          : `?page=${page}`;
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        console.log('RESPONSEEEEEEEEEe', { baseQueryReturnValue, meta, arg });
        if (baseQueryReturnValue.status === 404) {
          return {
            info: {
              count: 1,
              pages: 1,
            },
            results: [],
          };
        }
      },
    }),
  }),
});

export const { useGetCharactersQuery, useLazyGetCharactersQuery } =
  charactersApi;

// const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

// export const fetchCharacters = async (
//   searchTerm: string,
//   page: number = 1
// ): Promise<CharactersResponse> => {
//   try {
//     const url = searchTerm
//       ? `${API_BASE_URL}?page=${page}&name=${searchTerm}`
//       : `${API_BASE_URL}?page=${page}`;
//     const response = await fetch(url);
//     if (response.status === 404) {
//       return {
//         info: {
//           count: page,
//           pages: page,
//         },
//         results: [],
//       };
//     }
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error during fetch items');
//     throw error;
//   }
// };
