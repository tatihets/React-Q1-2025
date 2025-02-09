import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoadingErrorProvider } from '../providers/LoadingErrorProvider/LoadingErrorProvider';
import { ErrorBoundary } from '../../shared/ui';
import NotFound from '../../pages/notFound';
import Main from '../../pages/main';
import CharacterDetail from '../../entities/character-details';

import './index.css';

export const App = () => {
  return (
    <Router>
      <div className="app">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <LoadingErrorProvider>
                  <Main />
                </LoadingErrorProvider>
              }
            >
              <Route
                path="characters/:id"
                element={
                  <LoadingErrorProvider>
                    <CharacterDetail />
                  </LoadingErrorProvider>
                }
              />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};
