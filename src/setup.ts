import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';
import { reactDomMock } from './shared/__tests__/__mocks__/react-router-dom.mock';
import { server } from './shared/__tests__/__mocks__/api.mock';
import './shared/__tests__/__mocks__/react-redux.mock';

beforeAll(() => {
  vi.mock('react-router-dom', () => reactDomMock);
  server.listen();
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  vi.resetAllMocks();
  server.close();
});
