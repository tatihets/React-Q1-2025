import { createContext, useState, ReactNode } from 'react';
import { Spinner } from '../../shared/ui';

type LoadingErrorContextType = {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

type LoadingErrorProviderProps = {
  children: ReactNode;
};

export const LoadingErrorContext = createContext<
  LoadingErrorContextType | undefined
>(undefined);

export const LoadingErrorProvider = ({
  children,
}: LoadingErrorProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <LoadingErrorContext.Provider
      value={{ loading, error, setLoading, setError }}
    >
      {children}
      {loading && <Spinner />}
      {error && <div className="error-message">{error}</div>}
    </LoadingErrorContext.Provider>
  );
};
