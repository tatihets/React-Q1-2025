import { LoadingErrorProvider } from '../providers/LoadingErrorProvider';
import { ErrorBoundary } from '../../shared/ui';
import Main from '../../pages/main';

import './index.css';

export const App = () => (
  <div className="app">
    <ErrorBoundary>
      <header>
        <h1>Search Rick and Morty characters</h1>
      </header>
      <LoadingErrorProvider>
        <Main />
      </LoadingErrorProvider>
    </ErrorBoundary>
  </div>
);
