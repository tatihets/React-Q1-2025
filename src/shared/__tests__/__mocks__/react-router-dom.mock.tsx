import { vi } from 'vitest';

export const reactDomMock = {
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => vi.fn()),
  useParams: vi.fn(() => ({
    id: '1',
    page: '1',
  })),
  useLocation: vi.fn(() => ({
    search: '?page=1',
  })),
  useSearchParams: vi.fn(() => [new URLSearchParams('?page=1')]),
  Outlet: () => <div>Outlet</div>,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
};
