import { vi } from 'vitest';

vi.mock('react-redux', async () => {
  const actualReactRedux = await vi.importActual('react-redux');
  return {
    ...actualReactRedux,
    useDispatch: vi.fn(() => vi.fn()),
  };
});
