// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import charactersListMockedResponse from '../fixtures/characterslist.json';

const handlers = [
  // Mock your API call here
  http.get('https://rickandmortyapi.com/api/character', () =>
    HttpResponse.json(charactersListMockedResponse, {
      status: 200,
    })
  ),
  http.get('https://rickandmortyapi.com/api/character/:id', () =>
    HttpResponse.json(charactersListMockedResponse.results[0], {
      status: 200,
    })
  ),
];

export const server = setupServer(...handlers);
