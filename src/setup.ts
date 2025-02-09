import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';
import { reactDomMock } from './shared/__tests__/__mocks__/react-router-dom.mock';
import charactersListMockedResponse from './shared/__tests__/fixtures/characterslist.json';

beforeAll(() => {
  vi.mock('react-router-dom', () => reactDomMock);
  vi.mock('../../../shared/api/characters-list', () => ({
    fetchCharacters: vi.fn().mockResolvedValue(charactersListMockedResponse),
  }));
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  vi.resetAllMocks();
});
