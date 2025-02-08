import { useContext } from 'react';
import { LoadingErrorContext } from '../providers/LoadingErrorProvider';

export const useLoadingError = () => {
  const context = useContext(LoadingErrorContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
