import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ErrorBoundary } from '../../shared/ui';
import NotFound from '../../pages/notFound';
import Main from '../../pages/main';
import CharacterDetail from '../../entities/character-details';
import { useTheme } from '../hooks/use-theme';
import Theme from '../../features/Theme';

export const App = () => {
  const { isDarkMode } = useTheme();
  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <ErrorBoundary>
          <Theme />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="characters/:id" element={<CharacterDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};
