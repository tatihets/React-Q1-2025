import { Component } from 'react';

import { ErrorBoundary } from '../../shared/ui';
import Main from '../../pages/main';

import './index.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ErrorBoundary>
          <header>
            <h1>Search Rick and Morty characters</h1>
          </header>
          <Main />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
